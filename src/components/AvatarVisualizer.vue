<template>
  <div class="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
    <canvas ref="cv" :width="w" :height="h" :style="canvasStyle"></canvas>
  </div>
</template>

<script>
export default {
  name: 'AvatarVisualizer',
  props: {
    // Fine-tune multiplier relative to actual <img> radius (1.0 hugs edge)
    innerRatio: { type: Number, default: 1.0 },
    gain: { type: Number, default: 1.05 },
    barWidth: { type: Number, default: 2 },
    bars: { type: Number, default: 140 },
    // pixel adjustment to push bars closer/farther from the photo edge
    edgeOffset: { type: Number, default: 0 },
    // clear gap outside the visible edge where bars begin (negatif = sedikit overlap)
    gapOutside: { type: Number, default: -4 },
    // selector khusus untuk menemukan elemen IMG yang dipakai sebagai foto
    imageSelector: { type: String, default: 'img' },
    // gunakan wrapper luar melingkar sebagai acuan radius (default: true agar menempel ke list luar foto)
    useOuterWrapper: { type: Boolean, default: true },
    // extra pixels to expand drawing area beyond the image bounds so bars aren't cut off
    margin: { type: Number, default: 60 },
    // global scaler for bar length so amplitude can be shortened without affecting thickness
    lengthScale: { type: Number, default: 0.8 },
  },
  data() {
    return {
      analyser: null,
      audioCtx: null,
      raf: 0,
      w: 10,
      h: 10,
      active: false,
      ro: null,
      mo: null,
      imgEl: null,
      prevBass: 0,
      prevTreble: 0,
    }
  },
  mounted() {
    // Resize to parent container
    const el = this.$el.parentElement
    // cache img element: cari IMG terdekat berdasarkan selector, menelusuri beberapa tingkat
    const findNearestImg = (startEl) => {
      if (!startEl) return null
      // 1) coba di subtree startEl
      let img = startEl.querySelector(this.imageSelector)
      if (img) return img
      // 2) coba sibling sebelumnya/berikutnya yang mungkin berisi img
      let sib = startEl.previousElementSibling
      if (sib) {
        img = sib.matches(this.imageSelector) ? sib : sib.querySelector(this.imageSelector)
        if (img) return img
      }
      sib = startEl.nextElementSibling
      if (sib) {
        img = sib.matches(this.imageSelector) ? sib : sib.querySelector(this.imageSelector)
        if (img) return img
      }
      // 3) naik maksimal 3 level dan cari di subtree tiap level
      let p = startEl.parentElement
      for (let i=0; i<3 && p; i++) {
        img = p.matches(this.imageSelector) ? p : p.querySelector(this.imageSelector)
        if (img) return img
        p = p.parentElement
      }
      return null
    }
    this.imgEl = findNearestImg(el)
    // Observe DOM changes to catch IMG that appears later (e.g., v-if, lazy-load)
    if (el && !this.imgEl && 'MutationObserver' in window) {
      this.mo = new MutationObserver(() => {
        const found = findNearestImg(el)
        if (found) {
          this.imgEl = found
          // trigger a redraw next frame by toggling a tiny state if needed
        }
      })
      this.mo.observe(el, { childList: true, subtree: true, attributes: true })
    }
    const updateSize = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      this.w = Math.max(10, Math.floor(rect.width))
      this.h = Math.max(10, Math.floor(rect.height))
    }
    this.ro = new ResizeObserver(updateSize)
    if (el) this.ro.observe(el)
    updateSize()

    // listen to analyser from AudioPlayer
    window.addEventListener('audio-visualizer-ready', this.onReady)
    window.addEventListener('audio-visualizer-stop', this.onStop)

    // If music is already playing (navigated back), attach immediately
    try {
      if (window.__audioAnalyser) {
        this.analyser = window.__audioAnalyser
        this.audioCtx = window.__audioCtx || null
        this.active = true
        this.start()
      }
    } catch (_) { /* noop */ }
  },
  beforeUnmount() {
    cancelAnimationFrame(this.raf)
    if (this.ro) this.ro.disconnect()
    if (this.mo) this.mo.disconnect()
    window.removeEventListener('audio-visualizer-ready', this.onReady)
    window.removeEventListener('audio-visualizer-stop', this.onStop)
  },
  computed: {
    canvasStyle() {
      const m = this.margin + this.barWidth * 2
      return {
        position: 'absolute',
        left: `-${m}px`,
        top: `-${m}px`,
        width: `calc(100% + ${m * 2}px)`,
        height: `calc(100% + ${m * 2}px)`,
        // Ensure the visualizer has no opaque background and avoids a boxy look
        background: 'transparent',
        border: 'none',
        outline: 'none',
        borderRadius: '50%',
        pointerEvents: 'none',
      }
    }
  },
  methods: {
    onReady(e) {
      this.analyser = e.detail && e.detail.analyser || null
      this.audioCtx = e.detail && e.detail.audioCtx || null
      if (this.analyser) {
        this.active = true
        this.start()
      }
    },
    onStop() {
      this.active = false
      cancelAnimationFrame(this.raf)
      const cv = this.$refs.cv
      if (cv) {
        const ctx = cv.getContext('2d')
        ctx.clearRect(0,0,cv.width,cv.height)
      }
    },
    start() {
      const cv = this.$refs.cv
      if (!cv || !this.analyser) return
      const ctx = cv.getContext('2d')
      const buf = new Uint8Array(this.analyser.frequencyBinCount)

      const draw = () => {
        if (!this.active) return
        const w = this.w, h = this.h
        // match intrinsic canvas size to CSS size (including margin) to avoid scaling
        const m = this.margin + this.barWidth * 2
        cv.width = w + (m * 2)
        cv.height = h + (m * 2)
        ctx.clearRect(0,0,cv.width,cv.height)
        // Ensure transparent background without additive glow
        ctx.globalCompositeOperation = 'source-over'
        ctx.save()
        // Derive base radius from the visible outer circle (image or its circular wrapper)
        const pickOuterCircularEl = (el) => {
          if (!el) return null
          // climb up to 4 levels to find a circular element with border/padding
          let cur = el
          for (let i=0; i<4 && cur; i++) {
            const cs = getComputedStyle(cur)
            const br = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth)
            const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
            const rad = cs.borderRadius || ''
            const isCircle = /%/.test(rad) ? parseFloat(rad) >= 40 : (cur.offsetWidth > 0 && Math.abs(cur.offsetWidth - cur.offsetHeight) < 2 && parseFloat(rad) > 0)
            const hasRing = (br > 0.1) || (pad > 0.1) || cs.boxShadow !== 'none'
            if (isCircle && hasRing) return cur
            cur = cur.parentElement
          }
          return el
        }

        // Choose the same target element for radius and centering
        let targetEl = null
        let baseR
        if (this.imgEl) {
          targetEl = this.useOuterWrapper ? pickOuterCircularEl(this.imgEl) : this.imgEl
          const r = targetEl.getBoundingClientRect()
          baseR = Math.min(r.width, r.height) / 2
        } else {
          baseR = Math.min(w, h) / 2
        }
        // Place bars just outside the photo edge with a controllable gap
        const innerR = Math.max(0, (baseR * this.innerRatio) + this.gapOutside - this.edgeOffset)
        // center on target element's center relative to parent
        let cx = w/2, cy = h/2
        if (targetEl) {
          const parentRect = (this.$el.parentElement || cv).getBoundingClientRect()
          const tRect = targetEl.getBoundingClientRect()
          cx = (tRect.left - parentRect.left) + tRect.width/2
          cy = (tRect.top - parentRect.top) + tRect.height/2
        }
        // translate to the visual center accounting for the expanded canvas margins
        ctx.translate(cx + m, cy + m)

        // Clip to a circle large enough so bars are not cut off
        ctx.save()
        ctx.beginPath()
        const clipR = innerR + (Math.min(w,h) * 0.5) + (this.barWidth * 6)
        ctx.arc(0, 0, clipR, 0, Math.PI * 2)
        ctx.clip()

        this.analyser.getByteFrequencyData(buf)

        // Bass detection from low-frequency bins (smoothed)
        const bassBins = Math.max(8, Math.floor(buf.length * 0.08))
        let bassSum = 0
        for (let i = 0; i < bassBins; i++) bassSum += buf[i]
        const bassNow = (bassSum / bassBins) / 255
        const bassSmooth = this.prevBass * 0.82 + bassNow * 0.18
        this.prevBass = bassSmooth

        // Treble detection from high-frequency bins (smoothed)
        const trebleStart = Math.floor(buf.length * 0.72)
        let trebSum = 0, trebCount = 0
        for (let i = trebleStart; i < buf.length; i++) { trebSum += buf[i]; trebCount++; }
        const trebNow = trebCount ? (trebSum / trebCount) / 255 : 0
        const trebleSmooth = this.prevTreble * 0.82 + trebNow * 0.18
        this.prevTreble = trebleSmooth

        // Responsive: compute bar count/width from circumference so spacing stays consistent
        const circumference = Math.PI * 2 * innerR
        const desiredSpacing = 5 // px spacing target between bars (sedikit lebih rapat)
        let N = Math.max(100, Math.min(320, Math.round(circumference / desiredSpacing)))
        // Respect user-provided bars if explicitly smaller/larger by a lot
        if (this.bars) {
          N = Math.max(Math.min(this.bars, 360), 80)
        }
        // Thinner lines, minimal dynamic width scaling
        const lwBase = Math.max(0.8, Math.min(2.0, innerR * 0.008))
        const lw = Math.min(this.barWidth, lwBase)

        // Background halo removed to eliminate blur edge

        // Little smoothing to avoid jitter
        const smoothed = (iNorm) => {
          const idx = Math.min(buf.length - 1, Math.floor(Math.pow(iNorm, 0.6) * buf.length))
          let s = 0, c = 0
          for (let k = -2; k <= 2; k++) {
            const j = Math.max(0, Math.min(buf.length - 1, idx + k))
            s += buf[j]; c++
          }
          return (s / c) / 255
        }

        // Global beat
        const beatRaw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--beat'))
        const beat = isNaN(beatRaw) ? 0 : beatRaw
        // Beat boosts more on bass, a bit on treble
        const beatBoost = 1 + beat * 0.95 + bassSmooth * 1.4 + trebleSmooth * 0.6

        // Draw colorful bars with tip caps and subtle inner glow
        for (let i = 0; i < N; i++) {
          const t = i / N
          const angle = t * Math.PI * 2
          const v = smoothed(t)
          // Determine frequency region for this bar
          const idxForT = Math.min(buf.length - 1, Math.floor(Math.pow(t, 0.6) * buf.length))
          const f = idxForT / Math.max(1, buf.length - 1)
          // Weighting: emphasize bass (<~0.15) and treble (>~0.7), strongly de-emphasize mids
          let weight = 0.45 // base for mids (lebih kecil)
          if (f < 0.15) weight = 2.4 + bassSmooth * 1.2
          else if (f > 0.70) weight = 2.0 + trebleSmooth * 0.9
          else if (f > 0.30 && f < 0.60) weight = 0.4
          const v2 = Math.max(0, Math.min(1, v * weight))
          const amp = innerR * this.lengthScale * (0.05 + v2 * this.gain * beatBoost * (1 + bassSmooth * 0.9 + trebleSmooth * 0.4))

          // Color palette sweeps hue around the circle
          const hue = (t * 360)
          const sat = 96
          const light = 50 + v2 * 28
          const color = `hsl(${hue} ${sat}% ${light}%)`

          const x0 = Math.cos(angle) * innerR
          const y0 = Math.sin(angle) * innerR
          const x1 = Math.cos(angle) * (innerR + amp)
          const y1 = Math.sin(angle) * (innerR + amp)

          // Outer bright stroke
          ctx.strokeStyle = color
          ctx.lineWidth = lw
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.lineTo(x1, y1)
          ctx.stroke()

          // Tip cap (non-glow)
          ctx.save()
          ctx.shadowBlur = 0
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(x1, y1, Math.max(1.2, lw * 0.9), 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Inner soft stroke for depth
          ctx.strokeStyle = `hsla(${hue} ${sat}% 85% / 0.35)`
          ctx.lineWidth = Math.max(1, lw * 0.6)
          ctx.beginPath()
          const xi = Math.cos(angle) * (innerR + amp * 0.45)
          const yi = Math.sin(angle) * (innerR + amp * 0.45)
          ctx.moveTo(x0, y0)
          ctx.lineTo(xi, yi)
          ctx.stroke()
        }

        ctx.restore() // clip
        ctx.restore()
        this.raf = requestAnimationFrame(draw)
      }
      cancelAnimationFrame(this.raf)
      this.raf = requestAnimationFrame(draw)
    }
  }
}
</script>

<style scoped>
:host, div { display:block; }
</style>
