<template>
  <canvas ref="canvas" class="fixed inset-0 z-[120] pointer-events-none"></canvas>
</template>

<script>
export default {
  name: 'CursorEffects',
  data() {
    return {
      ctx: null,
      dpr: 1,
      particles: [],
      sparkles: [],
      width: 0,
      height: 0,
      rafId: 0,
      lastMove: 0,
      hue: 45, // (unused legacy) base amber
      baseHue: 0, // cycles for rainbow effect
      isDark: true,
      mouse: { x: -9999, y: -9999, vx: 0, vy: 0, t: 0 },
      reduce: false,
      // performance tuning
      quality: 'medium', // 'high' | 'medium' | 'low'
      maxParticles: 140,
      maxSparkles: 80,
      lastLoopTime: performance.now(),
      fpsAccumulator: 0,
      fpsFrames: 0,
      paused: false,
      active: false,
      // visual
      cursorPlusSize: 10
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d', { alpha: true })
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    const lowMemory = (navigator.deviceMemory && navigator.deviceMemory <= 4)
    // Prefer lower DPR by default to reduce fill cost on large screens
    this.dpr = Math.min(1.5, window.devicePixelRatio || 1)
    this.reduce = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || isTouch
    if (isTouch || lowMemory) {
      this.quality = 'low'
      this.dpr = 1
    }
    this.resize()
    window.addEventListener('resize', this.resize)
    window.addEventListener('mousemove', this.onMove, { passive: true })
    window.addEventListener('touchmove', this.onTouch, { passive: true })
    document.addEventListener('visibilitychange', this.onVisibility)
    const obs = new MutationObserver(this.syncTheme)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    this.syncTheme()
    // Do not start the loop yet; we will start it on first movement to stay idle when not used
  },
  beforeUnmount() {
    cancelAnimationFrame(this.rafId)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('touchmove', this.onTouch)
    document.removeEventListener('visibilitychange', this.onVisibility)
  },
  methods: {
    onVisibility() {
      this.paused = document.hidden
      if (!this.paused && (this.particles.length || this.sparkles.length)) this.startLoop()
    },
    startLoop() {
      if (this.active || this.paused) return
      this.active = true
      this.lastLoopTime = performance.now()
      this.rafId = requestAnimationFrame(this.loop)
    },
    syncTheme() {
      this.isDark = document.documentElement.classList.contains('dark')
    },
    resize() {
      const canvas = this.$refs.canvas
      this.width = window.innerWidth
      this.height = window.innerHeight
      canvas.width = Math.floor(this.width * this.dpr)
      canvas.height = Math.floor(this.height * this.dpr)
      canvas.style.width = this.width + 'px'
      canvas.style.height = this.height + 'px'
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
      // Use default compositing; 'lighter' can be expensive across many draws
      this.ctx.globalCompositeOperation = 'source-over'
    },
    onMove(e) {
      const now = performance.now()
      // throttle emissions to avoid overly fast trails
      if (!this.mouse.lastEmit) this.mouse.lastEmit = 0
      const emitCooldown = this.quality === 'high' ? 28 : this.quality === 'medium' ? 36 : 48 // ms
      if (now - this.mouse.lastEmit < emitCooldown) return
      const dx = e.clientX - this.mouse.x
      const dy = e.clientY - this.mouse.y
      this.mouse.vx = dx
      this.mouse.vy = dy
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
      this.mouse.t = now
      this.mouse.lastEmit = now
      this.emitTrail(this.mouse.x, this.mouse.y, Math.hypot(dx, dy))
      this.startLoop()
    },
    onTouch(e) {
      if (!e.touches || !e.touches[0]) return
      const t = e.touches[0]
      this.onMove({ clientX: t.clientX, clientY: t.clientY })
    },
    emitTrail(x, y, speed) {
      if (this.reduce) return
      let base = 0
      if (this.quality === 'high') base = 1.0 + (speed || 0) * 0.03
      else if (this.quality === 'medium') base = 0.8 + (speed || 0) * 0.025
      else base = 0.6 + (speed || 0) * 0.02
      const count = Math.min(this.quality === 'high' ? 3 : this.quality === 'medium' ? 2 : 2, base)
      for (let i = 0; i < count; i++) {
        // Dust particle
        const a = Math.random() * Math.PI * 2
        const r = (Math.random() * 0.7 + 0.25) * (this.isDark ? 1.3 : 1.6)
        this.particles.push({
          x, y,
          vx: Math.cos(a) * r,
          vy: Math.sin(a) * r - 0.5,
          life: 1,
          decay: 0.028 + Math.random() * 0.025,
          size: (this.quality === 'low' ? 1.0 : 1.3) + Math.random() * 1.0,
          hue: this.isDark ? 45 : 30,
        })
        // Sparkle
        if (Math.random() < (this.quality === 'high' ? 0.22 : this.quality === 'medium' ? 0.18 : 0.12)) {
          const angle = Math.random() * Math.PI * 2
          const spd = (this.quality === 'low' ? 0.6 : 0.9) + Math.random() * 0.7
          this.sparkles.push({
            x, y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            life: 1,
            decay: 0.04 + Math.random() * 0.03,
            size: (this.quality === 'low' ? 0.7 : 0.9) + Math.random() * 0.9,
            hue: (this.baseHue + Math.random() * 60) % 360,
          })
        }
      }
      // cap arrays to avoid unbounded growth
      if (this.particles.length > this.maxParticles) this.particles.splice(0, this.particles.length - this.maxParticles)
      if (this.sparkles.length > this.maxSparkles) this.sparkles.splice(0, this.sparkles.length - this.maxSparkles)
    },
    drawParticle(p) {
      const { ctx } = this
      const alpha = Math.max(0, p.life)
      const sat = this.isDark ? 86 : 78
      const light = this.isDark ? 52 : 40
      ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${light}%, ${alpha})`
      const w = p.size * 2
      const h = p.size * 2
      ctx.save()
      ctx.translate(p.x, p.y)
      // draw plus shape instead of circle
      ctx.fillRect(-w, -0.8, w * 2, 1.6)
      ctx.fillRect(-0.8, -h, 1.6, h * 2)
      ctx.restore()
    },
    drawSparkle(s) {
      const { ctx } = this
      const alpha = Math.max(0, s.life)
      const sat = this.isDark ? 86 : 78
      const light = this.isDark ? 60 : 45
      ctx.fillStyle = `hsla(${s.hue ?? this.baseHue}, ${sat}%, ${light}%, ${alpha})`
      const w = s.size * 2.2
      const h = s.size * 2.2
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate((1 - s.life) * 1.2)
      ctx.fillRect(-w / 2, -1, w, 2)
      ctx.fillRect(-1, -h / 2, 2, h)
      ctx.restore()
    },
    step(list) {
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        p.vy += 0.02 // gravity slower for calmer motion
        if (p.life <= 0 || p.y > this.height + 40) list.splice(i, 1)
      }
    },
    loop() {
      if (this.paused) { this.active = false; return }
      const { ctx, width, height } = this
      // fps tracking and auto quality
      const now = performance.now()
      const dt = now - this.lastLoopTime
      this.lastLoopTime = now
      const fps = dt > 0 ? 1000 / dt : 60
      this.fpsAccumulator += fps
      this.fpsFrames++
      if (this.fpsFrames >= 30) {
        const avg = this.fpsAccumulator / this.fpsFrames
        if (avg < 45 && this.quality !== 'low') {
          this.quality = this.quality === 'high' ? 'medium' : 'low'
          this.dpr = this.quality === 'low' ? 1 : Math.min(1.5, window.devicePixelRatio || 1)
          this.resize()
        } else if (avg > 55 && this.quality !== 'high') {
          this.quality = this.quality === 'low' ? 'medium' : 'high'
          this.dpr = Math.min(1.5, window.devicePixelRatio || 1)
          this.resize()
        }
        this.fpsAccumulator = 0
        this.fpsFrames = 0
      }

      ctx.clearRect(0, 0, width, height)
      // softly rotate base hue for rainbow flow
      this.baseHue = (this.baseHue + (this.quality === 'high' ? 0.6 : this.quality === 'medium' ? 0.45 : 0.3)) % 360
      const hasItems = (this.particles.length || this.sparkles.length)
      if (hasItems) {
        this.step(this.particles)
        this.step(this.sparkles)
      }
      // trail glow
      ctx.save()
      const blurBase = this.quality === 'high' ? (this.isDark ? 8 : 5) : this.quality === 'medium' ? (this.isDark ? 6 : 4) : (this.isDark ? 4 : 3)
      ctx.shadowBlur = blurBase
      // neutral glow so multi-colors look consistent
      ctx.shadowColor = this.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.12)'
      for (let i = 0; i < this.particles.length; i++) this.drawParticle(this.particles[i])
      ctx.restore()
      for (let i = 0; i < this.sparkles.length; i++) this.drawSparkle(this.sparkles[i])
      // Schedule next frame only if we still have items to animate
      if (hasItems) {
        this.rafId = requestAnimationFrame(this.loop)
      } else {
        this.active = false
      }
    }
  }
}
</script>

<style scoped>
/* no pointer events; sits on top of content via z-index */
</style>
