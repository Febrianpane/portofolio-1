<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Space Shooter</h2>
        <p class="text-slate-300 text-xs md:text-sm">Arrow/Kiri‑Kanan atau A/D untuk gerak. Spasi untuk tembak. Hindari musuh!</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-3 py-2 text-sm">Skor: <span class="font-semibold">{{ score }}</span></div>
        <button @click="toggle" class="py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:brightness-110 text-sm">
          {{ running ? 'Pause' : started ? 'Resume' : 'Start' }}
        </button>
        <button @click="reset" class="py-2 px-3 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">Reset</button>
      </div>
    </div>

    <div class="flex justify-center">
      <div ref="wrap" class="w-full max-w-[480px]">
        <canvas ref="canvas" class="rounded-xl border border-white/10 bg-black/60 w-full h-auto block"></canvas>
      </div>
    </div>

    <div v-if="gameOver" class="mt-4 p-4 rounded-xl border border-rose-700 bg-rose-900/30 text-rose-200 text-center">
      Game Over! Skor: {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameShooter',
  data() {
    return {
      ctx: null,
      width: 360,
      height: 540,
      player: { x: 180, y: 500, w: 26, h: 26, speed: 5 },
      keys: { left: false, right: false, shoot: false },
      bullets: [],
      enemies: [],
      lastShot: 0,
      shotDelay: 250, // ms
      lastSpawn: 0,
      spawnDelay: 800,
      score: 0,
      running: false,
      started: false,
      gameOver: false,
      rafId: null,
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    window.addEventListener('keydown', this.onKeyDown, { passive: false })
    window.addEventListener('keyup', this.onKeyUp, { passive: false })
    window.addEventListener('resize', this.fitCanvas)
    this.fitCanvas()
    this.reset(false)
    this.draw()
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('resize', this.fitCanvas)
    this.stop()
  },
  methods: {
    fitCanvas() {
      const wrap = this.$refs.wrap
      const canvas = this.$refs.canvas
      if (!wrap || !canvas) return
      const maxW = 480
      const aspect = 3/4 // 360x480ish
      const w = Math.min(maxW, Math.max(260, Math.floor(wrap.clientWidth)))
      const h = Math.floor(w / aspect)
      this.width = w
      this.height = h
      canvas.width = this.width
      canvas.height = this.height
      if (this.player) {
        this.player.y = this.height - 40
        this.player.x = Math.min(this.player.x, this.width - this.player.w)
      }
    },
    start() {
      if (this.running) return
      this.running = true
      this.started = true
      this.gameOver = false
      this.loop(performance.now())
    },
    stop() {
      this.running = false
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.rafId = null
    },
    toggle() {
      this.running ? this.stop() : this.start()
    },
    reset(recenter = true) {
      this.stop()
      this.score = 0
      this.gameOver = false
      this.bullets = []
      this.enemies = []
      if (recenter) this.player.x = this.width / 2 - this.player.w / 2
      this.player.y = this.height - 40
      this.lastShot = 0
      this.lastSpawn = 0
    },
    onKeyDown(e) {
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'arrowright' || k === ' ' || k === 'spacebar' || k === 'a' || k === 'd') {
        if (e.preventDefault) e.preventDefault()
        if (e.stopPropagation) e.stopPropagation()
      }
      if (k === 'arrowleft' || k === 'a') this.keys.left = true
      if (k === 'arrowright' || k === 'd') this.keys.right = true
      if (k === ' ' || k === 'spacebar') this.keys.shoot = true
      if (!this.started && (k === ' ' || k === 'spacebar')) this.start()
      if (k === 'p') this.toggle()
    },
    onKeyUp(e) {
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'arrowright' || k === ' ' || k === 'spacebar' || k === 'a' || k === 'd') {
        if (e.preventDefault) e.preventDefault()
        if (e.stopPropagation) e.stopPropagation()
      }
      if (k === 'arrowleft' || k === 'a') this.keys.left = false
      if (k === 'arrowright' || k === 'd') this.keys.right = false
      if (k === ' ' || k === 'spacebar') this.keys.shoot = false
    },
    spawnEnemy(now) {
      if (now - this.lastSpawn < this.spawnDelay) return
      this.lastSpawn = now
      const w = 24 + Math.floor(Math.random() * 12)
      const x = Math.floor(Math.random() * (this.width - w))
      const speed = 1.5 + Math.random() * 1.5
      this.enemies.push({ x, y: -30, w, h: w, speed })
      // speed up subtly over time
      if (this.spawnDelay > 350) this.spawnDelay -= 5
    },
    shoot(now) {
      if (!this.keys.shoot) return
      if (now - this.lastShot < this.shotDelay) return
      this.lastShot = now
      this.bullets.push({ x: this.player.x + this.player.w/2 - 2, y: this.player.y - 8, w: 4, h: 10, speed: 6 })
    },
    update(dt, now) {
      // player move
      if (this.keys.left) this.player.x -= this.player.speed
      if (this.keys.right) this.player.x += this.player.speed
      this.player.x = Math.max(0, Math.min(this.player.x, this.width - this.player.w))

      // bullets
      for (const b of this.bullets) b.y -= b.speed
      this.bullets = this.bullets.filter(b => b.y + b.h > 0)

      // enemies
      for (const e of this.enemies) e.y += e.speed
      // collisions bullet-enemy
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i]
        for (let j = this.bullets.length - 1; j >= 0; j--) {
          const b = this.bullets[j]
          if (this.overlap(e, b)) {
            this.enemies.splice(i, 1)
            this.bullets.splice(j, 1)
            this.score += 1
            break
          }
        }
      }
      // enemy out or hits player
      for (const e of this.enemies) {
        if (this.overlap(e, this.player) || e.y > this.height) {
          this.end()
          return
        }
      }

      // spawn & shoot
      this.spawnEnemy(now)
      this.shoot(now)
    },
    end() {
      this.gameOver = true
      this.stop()
    },
    overlap(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    },
    clear() {
      this.ctx.fillStyle = '#09090b'
      this.ctx.fillRect(0, 0, this.width, this.height)
    },
    drawPlayer() {
      this.ctx.fillStyle = '#fbbf24'
      this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h)
      // cannon
      this.ctx.fillStyle = '#fde68a'
      this.ctx.fillRect(this.player.x + this.player.w/2 - 2, this.player.y - 6, 4, 6)
    },
    drawBullets() {
      this.ctx.fillStyle = '#60a5fa'
      for (const b of this.bullets) this.ctx.fillRect(b.x, b.y, b.w, b.h)
    },
    drawEnemies() {
      this.ctx.fillStyle = '#ef4444'
      for (const e of this.enemies) this.ctx.fillRect(e.x, e.y, e.w, e.h)
    },
    draw() {
      this.clear()
      this.drawPlayer()
      this.drawBullets()
      this.drawEnemies()
    },
    loop(prev) {
      if (!this.running) return
      const now = performance.now()
      const dt = now - prev
      this.update(dt, now)
      this.draw()
      this.rafId = requestAnimationFrame(() => this.loop(now))
    },
  }
}
</script>

<style scoped>
</style>
