<template>
  <canvas ref="canvas" class="galaxy-canvas"></canvas>
</template>

<script>
export default {
  name: 'GalaxyBackground',
  props: {
    meteor: { type: Boolean, default: true },
    meteorCount: { type: Number, default: 3 },
    speedMultiplier: { type: Number, default: 1 },
    showerEvery: { type: Number, default: 14 }, // seconds; 0 to disable
    showerBurst: { type: Number, default: 5 },
    // If true, disable animations when user prefers-reduced-motion
    respectReducedMotion: { type: Boolean, default: true },
    // Direction controls (degrees): base angle and spread around it
    angleBaseDeg: { type: Number, default: -60 },
    angleSpreadDeg: { type: Number, default: 20 },
    // Trail look: 'white' | 'amber' | 'cyan' | 'violet' | 'rainbow'
    trailPreset: { type: String, default: 'white' },
    trailWidth: { type: Number, default: 2 },
    // Star field density control
    starDensityDivisor: { type: Number, default: 12000 },
    maxStars: { type: Number, default: 300 },
    // Cap device pixel ratio to limit fill-rate cost
    maxDpr: { type: Number, default: 1.25 },
  },
  data() {
    return {
      ctx: null,
      stars: [],
      meteors: [],
      nebulaNoise: null,
      dpr: Math.min(window.devicePixelRatio || 1, this.maxDpr || 1.25),
      animId: null,
      lastT: 0,
      reduced: false,
      showerTimer: null,
    }
  },
  mounted() {
    const reducePref = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.reduced = this.respectReducedMotion ? reducePref : false
    this.setup()
    window.addEventListener('resize', this.setup)
    this.loop(0)
    // schedule periodic meteor showers
    this.setupShower()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setup)
    if (this.animId) cancelAnimationFrame(this.animId)
    if (this.showerTimer) { clearInterval(this.showerTimer); this.showerTimer = null }
  },
  methods: {
    setup() {
      const canvas = this.$refs.canvas
      // Use clientWidth to avoid 100vw scrollbar overflow
      const w = document.documentElement.clientWidth
      const h = Math.max(window.innerHeight, document.documentElement.clientHeight)
      const dpr = this.dpr
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      this.ctx = canvas.getContext('2d')
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Generate star field (lighter density, capped)
      const divisor = (this.$props.starDensityDivisor || 12000)
      const cap = (this.$props.maxStars || 300)
      const starCount = this.reduced ? 100 : Math.min(cap, Math.floor((w * h) / divisor))
      this.stars = Array.from({ length: starCount }, () => this.makeStar(w, h))

      // Pre-make a simple noise texture for nebula
      // Disabled to remove gradient/nebula color background
      this.nebulaNoise = null

      // Seed a few meteors
      this.meteors = []
      const meteorCount = (this.reduced || !this.meteor) ? 0 : Math.max(0, this.meteorCount)
      for (let i = 0; i < meteorCount; i++) this.spawnMeteor(w, h, true)
    },

    setupShower() {
      if (this.showerTimer) { clearInterval(this.showerTimer); this.showerTimer = null }
      if (this.reduced || !this.meteor) return
      if (!this.showerEvery || this.showerEvery <= 0) return
      this.showerTimer = setInterval(() => {
        const { ctx } = this
        if (!ctx) return
        const w = ctx.canvas.width / this.dpr
        const h = ctx.canvas.height / this.dpr
        // spawn a burst angled diagonally
        const burst = Math.max(1, this.showerBurst | 0)
        for (let i = 0; i < burst; i++) this.spawnMeteor(w, h, false, true)
      }, this.showerEvery * 1000)
    },

    makeStar(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 2 + 0.5,
        hue: 200 + Math.floor(Math.random() * 60),
        parallax: Math.random() * 0.6 + 0.4,
      }
    },

    spawnMeteor(w, h, randomDelay = false, isBurst = false) {
      const len = (Math.random() * 200 + 120) * (isBurst ? 1.2 : 1)
      const speed = (Math.random() * 2 + 2) * (isBurst ? 1.6 : 1) * (this.speedMultiplier || 1)
      // compute angle in radians from props
      const base = (this.angleBaseDeg || -60) * Math.PI / 180
      const spread = (this.angleSpreadDeg || 20) * Math.PI / 180
      const angle = base + (Math.random() - 0.5) * spread
      const startX = Math.random() * w
      const startY = -50 - Math.random() * h
      // Assign hue for rainbow preset
      const hue = Math.floor(Math.random() * 360)
      this.meteors.push({ x: startX, y: startY, len, speed, angle, life: randomDelay ? Math.random() * 3 : 0, hue })
    },

    makeNebulaTexture(w, h) {
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const c = off.getContext('2d')

      const img = c.createImageData(w, h)
      for (let i = 0; i < img.data.length; i += 4) {
        const nx = (i / 4) % w
        const ny = Math.floor((i / 4) / w)
        // Simple layered noise
        const v = (
          Math.sin(nx * 0.022) + Math.sin(ny * 0.018) +
          Math.sin((nx + ny) * 0.01) + Math.sin((nx - ny) * 0.013)
        ) * 0.25 + 0.5
        const col = Math.max(0, Math.min(255, Math.floor(v * 255)))
        // purple-blue hue
        img.data[i + 0] = col * 0.5
        img.data[i + 1] = col * 0.3
        img.data[i + 2] = col
        img.data[i + 3] = Math.floor(col * 0.25) // alpha
      }
      c.putImageData(img, 0, 0)

      // Soft blur using shadow draw
      c.globalCompositeOperation = 'lighter'
      for (let k = 0; k < 3; k++) {
        c.drawImage(off, 0, 0)
      }
      return off
    },

    drawNebula(t) {
      if (!this.nebulaNoise) return
      const { ctx } = this
      const w = ctx.canvas.width / this.dpr
      const h = ctx.canvas.height / this.dpr
      const drift = t * 0.0005
      const nx = (Math.sin(drift) * 100)
      const ny = (Math.cos(drift * 0.7) * 80)
      ctx.globalAlpha = 0.55
      ctx.globalCompositeOperation = 'screen'
      ctx.drawImage(this.nebulaNoise, nx, ny, w + 200, h + 200)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    },

    drawStars(t) {
      const { ctx, stars } = this
      for (const s of stars) {
        const tw = (Math.sin(t * 0.002 * s.twinkleSpeed + s.x) + 1) * 0.5
        const a = s.baseAlpha * (0.6 + tw * 0.8)
        ctx.beginPath()
        // In light mode, use rainbow hue cycling; in dark, keep original bluish hue
        const isDark = document.documentElement.classList.contains('dark')
        const hue = isDark
          ? s.hue
          : ( ( (t * 0.06) + (s.x * 0.1) ) % 360 )
        ctx.fillStyle = `hsla(${hue}, 95%, 70%, ${a})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    },

    updateMeteors(dt, w, h) {
      for (const m of this.meteors) {
        if (m.life > 0) { m.life -= dt; continue }
        m.x += Math.cos(m.angle) * m.speed * (dt * 60 / 1000)
        m.y += Math.sin(m.angle) * m.speed * (dt * 60 / 1000)
      }
      // remove offscreen and respawn
      this.meteors = this.meteors.filter(m => m.x > -300 && m.y < h + 300)
      const target = (this.reduced || !this.meteor) ? 0 : Math.max(0, this.meteorCount)
      while (this.meteors.length < target) this.spawnMeteor(w, h)
    },

    trailColorsFor(m) {
      const preset = (this.trailPreset || 'white').toLowerCase()
      if (preset === 'amber') return ['rgba(251,191,36,0.9)', 'rgba(251,191,36,0)']
      if (preset === 'cyan') return ['rgba(34,211,238,0.9)', 'rgba(34,211,238,0)']
      if (preset === 'violet') return ['rgba(168,85,247,0.9)', 'rgba(168,85,247,0)']
      if (preset === 'rainbow') return [`hsla(${m.hue}, 90%, 70%, 0.95)`, `hsla(${m.hue}, 90%, 70%, 0)`]
      return ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0)']
    },

    drawMeteors() {
      const { ctx } = this
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      // Add soft glow to make trails more visible
      const dark = document.documentElement.classList.contains('dark')
      ctx.shadowBlur = dark ? 10 : 8
      ctx.shadowColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.25)'
      for (const m of this.meteors) {
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(m.angle) * m.len, m.y - Math.sin(m.angle) * m.len)
        const [c0, c1] = this.trailColorsFor(m)
        grad.addColorStop(0, c0)
        grad.addColorStop(1, c1)
        ctx.strokeStyle = grad
        ctx.lineWidth = Math.max(0.5, this.trailWidth || 2)
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(m.x - Math.cos(m.angle) * m.len, m.y - Math.sin(m.angle) * m.len)
        ctx.stroke()
      }
      ctx.restore()
    },

    loop(t) {
      const { ctx } = this
      if (!ctx) return
      const dt = this.lastT ? (t - this.lastT) : 16
      this.lastT = t

      const w = ctx.canvas.width / this.dpr
      const h = ctx.canvas.height / this.dpr

      // Clear transparently (no solid background color)
      ctx.clearRect(0, 0, w, h)
      // Nebula disabled to avoid gradient-like haze

      this.drawStars(t)

      if (!this.reduced && this.meteor) {
        this.updateMeteors(dt, w, h)
        this.drawMeteors()
      }

      this.animId = requestAnimationFrame(this.loop)
    },
  },
}
</script>

<style scoped>
.galaxy-canvas {
  position: fixed;       /* stick to viewport so it doesn't scroll with content */
  top: 0;
  left: 0;
  z-index: -2;           /* above aurora(-3), behind content */
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;  /* do not block clicks */
}
</style>
