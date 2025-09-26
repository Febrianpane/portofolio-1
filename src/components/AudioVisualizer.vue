<template>
  <canvas ref="cv" :width="size" :height="size" class="fixed inset-0 m-auto pointer-events-none" :style="canvasStyle" aria-hidden="true"></canvas>
</template>

<script>
export default {
  name: 'AudioVisualizer',
  props: {
    size: { type: Number, default: 360 },
    responsive: { type: Boolean, default: true },
    // 0..1 opacity
    opacity: { type: Number, default: 0.9 },
    // thickness of bars
    barWidth: { type: Number, default: 2 },
    // radius ratio for inner circle
    innerRatio: { type: Number, default: 0.45 },
    // how strong the bars extend
    gain: { type: Number, default: 0.5 },
    // overall length scale for bars (0..1)
    lengthScale: { type: Number, default: 0.48 },
    // minimum normalized bar length (0 removes outer ring)
    minBar: { type: Number, default: 0 },
    // smoothing factor for levels (0..1, higher = smoother/slower)
    smoothingFactor: { type: Number, default: 0.35 },
    // number of bars (radial) around the circle
    numBars: { type: Number, default: 72 },
    // small gap so inner ends of bars don't form a circle (in pixels)
    innerGapPx: { type: Number, default: 7 },
    // side padding as fraction of canvas width (0..0.5)
    sidePaddingRatio: { type: Number, default: 0.06 },
    // visual rings like the example
    showInnerRings: { type: Boolean, default: true },
    ringWidth: { type: Number, default: 2 },
    ringColor: { type: String, default: '#A855F7' }, // solid inner ring color (purple)
    dottedRingColor: { type: String, default: '#34D399' }, // dotted ring color (green)
    // thin outer gradient ring just outside inner ring (like sample)
    showOuterGradientRing: { type: Boolean, default: true },
    outerRingWidth: { type: Number, default: 2 },
    // auto demo animation when no analyser yet, so effect selalu terlihat
    autoDemo: { type: Boolean, default: true },
    // zIndex (raised to ensure canvas is above other content)
    z: { type: Number, default: 9999 },
  },
  data() {
    return {
      analyser: null,
      audioCtx: null,
      raf: 0,
      active: false,
      prevLevels: [],
    }
  },
  computed: {
    canvasStyle() {
      const wh = this.responsive ? 'clamp(220px, 60vmin, 520px)' : (this.size + 'px')
      return {
        width: wh,
        height: wh,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: this.z,
        opacity: this.opacity,
      }
    }
  },
  mounted() {
    // bind to events from AudioPlayer
    window.addEventListener('audio-visualizer-ready', this.onReady)
    window.addEventListener('audio-visualizer-stop', this.onStop)
    // If AudioPlayer already running, try to fetch from window (optional future enhancement)
    // Start an idle render loop so the effect is visible even before audio starts
    if (!this.active) {
      this.active = true
      this.start()
    }
  },
  updated() {
    // When props/styles change via HMR or reactive updates, restart the loop
    if (this.active) this.restart()
  },
  beforeUnmount() {
    window.removeEventListener('audio-visualizer-ready', this.onReady)
    window.removeEventListener('audio-visualizer-stop', this.onStop)
    cancelAnimationFrame(this.raf)
  },
  methods: {
    restart() {
      cancelAnimationFrame(this.raf)
      // Small delay to ensure previous frame fully cleared
      this.raf = requestAnimationFrame(() => this.start())
    },
    onReady(e) {
      this.analyser = e.detail?.analyser || null
      this.audioCtx = e.detail?.audioCtx || null
      try { console.debug('[AudioVisualizer] onReady analyser:', !!this.analyser) } catch (_) {}
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
      if (!cv) return
      const ctx = cv.getContext('2d')
      const buf = new Uint8Array(this.analyser ? this.analyser.frequencyBinCount : 512)
      // circular equalizer around full 360°, spaced bars
      const N = Math.max(24, (this.numBars|0))
      const center = { x: cv.width/2, y: cv.height/2 }
      const innerR = (Math.min(cv.width, cv.height) * this.innerRatio) | 0
      const maxAmp = Math.min(cv.width, cv.height) * 0.32
      // init smoothing buffer
      if (!this.prevLevels || this.prevLevels.length !== N) {
        this.prevLevels = new Array(N).fill(0)
      }

      const draw = () => {
        try {
          if (!this.active) return
          if (this.analyser) {
            this.analyser.getByteFrequencyData(buf)
          } else {
            // idle/demo frame: synthesize spectrum so visual terlihat
            const t = (this.audioCtx?.currentTime || performance.now() / 1000)
            if (this.autoDemo) {
              const L = buf.length
              for (let i = 0; i < L; i++) {
                const f = i / L
                const env = Math.pow(1 - f, 0.6)
                const wob = (Math.sin(2 * Math.PI * (0.8 * t - f * 2)) + 1) * 0.5
                const kick = (Math.sin(2 * Math.PI * (t)) > 0.95 ? 1 : 0)
                const val = Math.min(255, Math.max(0, 255 * env * (0.2 + 0.6 * wob + 0.2 * kick)))
                buf[i] = val | 0
              }
            } else {
              buf.fill(0)
            }
          }

          // clear and center before drawing
          ctx.clearRect(0,0,cv.width,cv.height)
          ctx.save()
          ctx.translate(center.x, center.y)

          // optional thin gradient ring slightly outside innerR
          if (this.showOuterGradientRing) {
            const gradR = innerR + Math.max(2, this.innerGapPx - 2)
            if (typeof ctx.createConicGradient === 'function') {
              const arcGrad = ctx.createConicGradient(0, 0, 0)
              arcGrad.addColorStop(0.00, 'hsl(285 90% 60%)')
              arcGrad.addColorStop(0.50, 'hsl(315 90% 60%)')
              arcGrad.addColorStop(1.00, 'hsl(285 90% 60%)')
              ctx.save()
              ctx.strokeStyle = arcGrad
              ctx.lineWidth = this.outerRingWidth
              ctx.setLineDash([])
              ctx.beginPath()
              ctx.arc(0, 0, gradR, 0, Math.PI * 2)
              ctx.stroke()
              ctx.restore()
            } else {
              // fallback: simple purple stroke
              ctx.save()
              ctx.strokeStyle = this.ringColor
              ctx.lineWidth = Math.max(1, this.outerRingWidth - 0.5)
              ctx.setLineDash([])
              ctx.beginPath()
              ctx.arc(0, 0, gradR, 0, Math.PI * 2)
              ctx.stroke()
              ctx.restore()
            }
          }

          // optional inner rings (solid + dotted)
          if (this.showInnerRings) {
            ctx.save()
            ctx.lineWidth = this.ringWidth
            ctx.setLineDash([])
            ctx.strokeStyle = this.ringColor
            ctx.beginPath()
            ctx.arc(0, 0, innerR, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()

            const dottedR = Math.max(1, innerR - Math.max(2, this.innerGapPx))
            ctx.save()
            ctx.lineWidth = 1.5
            ctx.setLineDash([2, 6])
            ctx.strokeStyle = this.dottedRingColor
            ctx.beginPath()
            ctx.arc(0, 0, dottedR, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()
          }

          // render discrete radial bars (spectrum)
          const startR = innerR + this.innerGapPx
          ctx.lineWidth = this.barWidth
          ctx.lineCap = 'round'

          for (let i = 0; i < N; i++) {
            const t = i / N
            const angle = t * Math.PI * 2

            const m0 = t < 0.5 ? (t * 2) : (1 - (t - 0.5) * 2)
            const m1t = (i + 1) / N
            const m1 = m1t < 0.5 ? (m1t * 2) : (1 - (m1t - 0.5) * 2)
            const f0 = Math.pow(m0, 0.6)
            const f1 = Math.pow(m1, 0.6)
            const i0 = Math.min(buf.length - 1, Math.floor(f0 * buf.length))
            const i1 = Math.min(buf.length, Math.floor(f1 * buf.length))
            let sum = 0
            let count = 0
            for (let k = i0; k < i1; k++) { sum += buf[k]; count++; }
            const raw = count > 0 ? (sum / count) / 255 : (buf[i0] / 255)

            const prev = this.prevLevels[i]
            const alpha = Math.max(0, Math.min(0.95, this.smoothingFactor))
            const smooth = prev + (raw - prev) * (1 - alpha)
            this.prevLevels[i] = smooth

            const amp = (Math.max(0, this.minBar) + smooth * this.gain) * maxAmp * Math.max(0, Math.min(1.2, this.lengthScale))

            const hue = 280 + (t * 50)
            const sat = 90
            const light = 56 + smooth * 10
            ctx.strokeStyle = `hsl(${hue} ${sat}% ${light}%)`

            const x0 = Math.cos(angle) * startR
            const y0 = Math.sin(angle) * startR
            const x1 = Math.cos(angle) * (startR + amp)
            const y1 = Math.sin(angle) * (startR + amp)

            const seg = Math.max(2.5, this.barWidth * 1.6)
            const gap = seg * 0.6
            ctx.setLineDash([seg, gap])

            ctx.beginPath()
            ctx.moveTo(x0, y0)
            ctx.lineTo(x1, y1)
            ctx.stroke()

            ctx.setLineDash([])
          }

          ctx.restore()
        } catch (err) {
          try { console.error('[AudioVisualizer] draw error:', err) } catch (_) {}
        } finally {
          this.raf = requestAnimationFrame(draw)
        }
      }
      cancelAnimationFrame(this.raf)
      this.raf = requestAnimationFrame(draw)
    }
  }
}
</script>

<style scoped>
canvas { filter: drop-shadow(0 0 8px rgba(0,0,0,0.25)); }
@media (max-width: 640px) {
  canvas { transform: scale(0.85); }
}
</style>
