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
    // extra pixels to expand drawing area beyond the image bounds so bars aren't cut off
    margin: { type: Number, default: 20 },
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
      imgEl: null,
    }
  },
  mounted() {
    // Resize to parent container
    const el = this.$el.parentElement
    // cache img element within same container
    this.imgEl = el ? el.querySelector('img') : null
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
  },
  beforeUnmount() {
    cancelAnimationFrame(this.raf)
    if (this.ro) this.ro.disconnect()
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
        cv.width = w
        cv.height = h
        ctx.clearRect(0,0,w,h)
        // Ensure transparent background and additive blending for light-only effect (reset each resize)
        ctx.globalCompositeOperation = 'lighter'
        ctx.save()
        // Derive base radius from actual <img> width to align with photo edge
        let baseR
        if (this.imgEl) {
          const r = this.imgEl.getBoundingClientRect()
          baseR = r.width / 2
        } else {
          baseR = Math.min(w, h) / 2
        }
        const innerR = Math.max(0, (baseR * this.innerRatio) - this.edgeOffset)
        const cx = w/2, cy = h/2
        ctx.translate(cx, cy)

        // Clip to a circle large enough so bars are not cut off
        ctx.save()
        ctx.beginPath()
        const clipR = innerR + (Math.min(w,h) * 0.5) + (this.barWidth * 6)
        ctx.arc(0, 0, clipR, 0, Math.PI * 2)
        ctx.clip()

        this.analyser.getByteFrequencyData(buf)
        const N = this.bars
        for (let i=0; i<N; i++) {
          const t = i / N
          const angle = t * Math.PI * 2
          // emphasize low-mid
          const idx = Math.min(buf.length-1, Math.floor(Math.pow(t, 0.6) * buf.length))
          const v = buf[idx] / 255
          // read global --beat for extra punch
          const beatRaw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--beat'))
          const beat = isNaN(beatRaw) ? 0 : beatRaw
          const beatBoost = 1 + beat * 0.9
          const amp = innerR * (0.08 + v * this.gain * beatBoost)

          // rainbow color
          const hue = (t * 360)
          const sat = 96
          const light = 50 + v * 20
          ctx.strokeStyle = `hsl(${hue} ${sat}% ${light}%)`
          ctx.lineWidth = this.barWidth
          ctx.lineCap = 'round'

          const x0 = Math.cos(angle) * innerR
          const y0 = Math.sin(angle) * innerR
          const x1 = Math.cos(angle) * (innerR + amp)
          const y1 = Math.sin(angle) * (innerR + amp)

          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.lineTo(x1, y1)
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
