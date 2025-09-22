<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Snake</h2>
        <p class="text-slate-300 text-xs md:text-sm">Gunakan tombol arah (WASD/Arrow) untuk bergerak. Makan 🍎 untuk menambah skor.</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-3 py-2 text-sm">Skor: <span class="font-semibold">{{ score }}</span></div>
        <button @click="toggle" class="py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-sm">
          {{ running ? 'Pause' : started ? 'Resume' : 'Start' }}
        </button>
        <button @click="reset" class="py-2 px-3 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">Reset</button>
      </div>
    </div>

    <div class="flex justify-center">
      <div ref="wrap" class="w-full max-w-[420px]">
        <canvas ref="canvas" :width="canvasSize" :height="canvasSize" class="rounded-xl border border-white/10 bg-black/40 w-full h-auto block"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameSnake',
  data() {
    return {
      ctx: null,
      grid: 20, // cell size, will be recalculated responsively
      cells: 20, // grid count (canvas size = grid*cells)
      snake: [{ x: 10, y: 10 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 5, y: 5 },
      score: 0,
      loopId: null,
      speedMs: 120,
      running: false,
      started: false,
    }
  },
  computed: {
    canvasSize() { return this.grid * this.cells },
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    this.adjustCanvas()
    this.spawnFood()
    window.addEventListener('keydown', this.onKey, { passive: false })
    window.addEventListener('resize', this.adjustCanvas)
    this.draw()
  },
  beforeUnmount() {
    this.stop()
    window.removeEventListener('keydown', this.onKey)
    window.removeEventListener('resize', this.adjustCanvas)
  },
  methods: {
    adjustCanvas() {
      // Fit canvas to wrapper width while keeping square and integer grid
      const wrap = this.$refs.wrap
      const canvas = this.$refs.canvas
      if (!wrap || !canvas) return
      const size = Math.min(420, Math.max(220, Math.floor(wrap.clientWidth)))
      // compute grid so that grid*cells <= size and divisible evenly
      const g = Math.floor(size / this.cells)
      this.grid = Math.max(10, g)
      const px = this.grid * this.cells
      // set canvas pixel size (not just CSS) for crisp rendering
      canvas.width = px
      canvas.height = px
    },
    start() {
      if (this.running) return
      this.running = true
      this.started = true
      this.loopId = setInterval(this.step, this.speedMs)
    },
    stop() {
      this.running = false
      if (this.loopId) { clearInterval(this.loopId); this.loopId = null }
    },
    toggle() { this.running ? this.stop() : this.start() },
    reset() {
      this.stop()
      this.snake = [{ x: 10, y: 10 }]
      this.dir = { x: 1, y: 0 }
      this.nextDir = { x: 1, y: 0 }
      this.score = 0
      this.spawnFood()
      this.adjustCanvas()
      this.draw()
      this.started = false
    },
    onKey(e) {
      const key = e.key.toLowerCase()
      // Prevent page scroll on control keys
      if (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright' || key === ' ' || key === 'spacebar' || key === 'w' || key === 'a' || key === 's' || key === 'd') {
        if (e.preventDefault) e.preventDefault()
        if (e.stopPropagation) e.stopPropagation()
      }
      if (key === 'arrowup' || key === 'w') this.setDir(0, -1)
      else if (key === 'arrowdown' || key === 's') this.setDir(0, 1)
      else if (key === 'arrowleft' || key === 'a') this.setDir(-1, 0)
      else if (key === 'arrowright' || key === 'd') this.setDir(1, 0)
      else if (key === ' ' || key === 'spacebar') this.toggle()
    },
    setDir(x, y) {
      // prevent reversing directly
      if (this.dir.x + x === 0 && this.dir.y + y === 0) return
      this.nextDir = { x, y }
    },
    step() {
      // update direction
      this.dir = this.nextDir
      const head = { x: this.snake[0].x + this.dir.x, y: this.snake[0].y + this.dir.y }

      // walls (wrap around)
      head.x = (head.x + this.cells) % this.cells
      head.y = (head.y + this.cells) % this.cells

      // self collision
      if (this.snake.some((s, i) => i !== 0 && s.x === head.x && s.y === head.y)) {
        this.gameOver()
        return
      }

      this.snake.unshift(head)

      // eat food
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score += 1
        this.spawnFood()
      } else {
        this.snake.pop()
      }

      this.draw()
    },
    gameOver() {
      this.stop()
      this.started = false
      // simple flash or alert
      // eslint-disable-next-line no-alert
      alert('Game Over! Skor: ' + this.score)
      this.reset()
    },
    spawnFood() {
      let x, y
      do {
        x = Math.floor(Math.random() * this.cells)
        y = Math.floor(Math.random() * this.cells)
      } while (this.snake.some(s => s.x === x && s.y === y))
      this.food = { x, y }
    },
    drawCell(x, y, color) {
      this.ctx.fillStyle = color
      this.ctx.fillRect(x * this.grid + 1, y * this.grid + 1, this.grid - 2, this.grid - 2)
    },
    clear() {
      this.ctx.fillStyle = '#0b0b0b'
      this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize)
    },
    draw() {
      this.clear()
      // grid optional
      this.ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      for (let i = 0; i <= this.cells; i++) {
        this.ctx.beginPath(); this.ctx.moveTo(i * this.grid, 0); this.ctx.lineTo(i * this.grid, this.canvasSize); this.ctx.stroke()
        this.ctx.beginPath(); this.ctx.moveTo(0, i * this.grid); this.ctx.lineTo(this.canvasSize, i * this.grid); this.ctx.stroke()
      }
      // food
      this.drawCell(this.food.x, this.food.y, '#ef4444')
      // snake
      this.snake.forEach((s, i) => this.drawCell(s.x, s.y, i === 0 ? '#fbbf24' : '#93c5fd'))
    },
  }
}
</script>

<style scoped>
canvas { image-rendering: pixelated; }
</style>
