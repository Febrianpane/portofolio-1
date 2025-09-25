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
    barWidth: { type: Number, default: 3 },
    // radius ratio for inner circle
    innerRatio: { type: Number, default: 0.45 },
    // how strong the bars extend
    gain: { type: Number, default: 0.9 },
    // zIndex
    z: { type: Number, default: 5 },
  },
  data() {
    return {
      analyser: null,
      audioCtx: null,
      raf: 0,
      active: false,
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
  },
  beforeUnmount() {
    window.removeEventListener('audio-visualizer-ready', this.onReady)
    window.removeEventListener('audio-visualizer-stop', this.onStop)
    cancelAnimationFrame(this.raf)
  },
  methods: {
    onReady = (e) => {
      this.analyser = e.detail?.analyser || null
      this.audioCtx = e.detail?.audioCtx || null
      if (this.analyser) {
        this.active = true
        this.start()
      }
    },
    onStop = () => {
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
      const N = 128 // number of samples around circle
      const innerR = (Math.min(cv.width, cv.height) * this.innerRatio) | 0
      const center = { x: cv.width/2, y: cv.height/2 }

      const draw = () => {
        if (!this.active) return
        this.analyser.getByteFrequencyData(buf)
        ctx.clearRect(0,0,cv.width,cv.height)
        ctx.save()
        ctx.translate(center.x, center.y)
        // base circle glow
        ctx.beginPath()
        ctx.arc(0, 0, innerR, 0, Math.PI*2)
        const glowGrad = ctx.createRadialGradient(0,0, innerR*0.7, 0,0, innerR*1.2)
        glowGrad.addColorStop(0, 'rgba(0,0,0,0)')
        glowGrad.addColorStop(1, 'rgba(0,0,0,0.4)')
        ctx.fillStyle = glowGrad
        ctx.fill()

        for (let i=0;i<N;i++) {
          const t = i / N
          const angle = t * Math.PI * 2
          // pick frequency bin mapped non-linearly (more low-mid emphasis)
          const idx = Math.min(buf.length-1, Math.floor(Math.pow(t, 0.6) * buf.length))
          const v = buf[idx] / 255
          const amp = innerR * (0.12 + v * this.gain) // bar length

          // rainbow color by angle (hsl 0..360)
          const hue = (t * 360)
          const sat = 95
          const light = 55 + v*15
          ctx.strokeStyle = `hsl(${hue} ${sat}% ${light}%)`
          ctx.lineWidth = this.barWidth
          ctx.lineCap = 'round'

          // draw bar outwards
          const x0 = Math.cos(angle) * innerR
          const y0 = Math.sin(angle) * innerR
          const x1 = Math.cos(angle) * (innerR + amp)
          const y1 = Math.sin(angle) * (innerR + amp)

          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.lineTo(x1, y1)
          ctx.stroke()
        }

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
canvas { filter: drop-shadow(0 0 8px rgba(0,0,0,0.25)); }
@media (max-width: 640px) {
  canvas { transform: scale(0.85); }
}
</style>
