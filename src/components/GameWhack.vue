<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Whack‑a‑Mole</h2>
        <p class="text-slate-300 text-xs md:text-sm">Klik/tap tikus yang muncul. Kecepatan meningkat seiring waktu!</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-3 py-2 text-sm">Skor: <span class="font-semibold">{{ score }}</span></div>
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-3 py-2 text-sm">Waktu: <span class="font-semibold">{{ timeLeft }}s</span></div>
        <button @click="start" :disabled="running" class="py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-sm disabled:opacity-50">Start</button>
        <button @click="reset" class="py-2 px-3 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">Reset</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 max-w-md mx-auto select-none">
      <button v-for="(hole, idx) in holes" :key="idx"
              @click="hit(idx)"
              class="aspect-square rounded-xl border border-white/10 bg-[#0b0b0b] relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center transition-opacity"
             :class="hole.active ? 'opacity-100' : 'opacity-0'">
          <span class="text-3xl">🐭</span>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/50 to-transparent"></div>
      </button>
    </div>

    <div v-if="gameOver" class="mt-4 p-4 rounded-xl border border-amber-700 bg-amber-900/30 text-amber-200 text-center">
      Selesai! Skor akhir: {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameWhack',
  data() {
    return {
      holes: Array.from({ length: 9 }, () => ({ active: false })),
      score: 0,
      running: false,
      gameOver: false,
      timeLeft: 30,
      tickId: null,
      spawnId: null,
      appearMs: 800,
    }
  },
  beforeUnmount() {
    this.stop()
  },
  methods: {
    start() {
      if (this.running) return
      this.running = true
      this.gameOver = false
      this.score = 0
      this.timeLeft = 30
      this.appearMs = 800
      this.tickId = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft % 5 === 0 && this.appearMs > 300) {
          this.appearMs -= 80 // speed up
          this.restartSpawner()
        }
        if (this.timeLeft <= 0) {
          this.end()
        }
      }, 1000)
      this.startSpawner()
    },
    end() {
      this.stop()
      this.gameOver = true
    },
    stop() {
      this.running = false
      if (this.tickId) { clearInterval(this.tickId); this.tickId = null }
      if (this.spawnId) { clearInterval(this.spawnId); this.spawnId = null }
      this.clearHoles()
    },
    reset() {
      this.stop()
      this.score = 0
      this.timeLeft = 30
      this.gameOver = false
    },
    startSpawner() {
      this.spawnId = setInterval(this.spawn, this.appearMs)
    },
    restartSpawner() {
      if (this.spawnId) clearInterval(this.spawnId)
      this.startSpawner()
    },
    spawn() {
      this.clearHoles()
      const count = Math.random() < 0.2 ? 2 : 1
      const indices = []
      while (indices.length < count) {
        const i = Math.floor(Math.random() * this.holes.length)
        if (!indices.includes(i)) indices.push(i)
      }
      indices.forEach(i => this.$set ? this.$set(this.holes, i, { active: true }) : (this.holes[i] = { active: true }))
      setTimeout(() => {
        indices.forEach(i => this.$set ? this.$set(this.holes, i, { active: false }) : (this.holes[i] = { active: false }))
      }, Math.max(250, this.appearMs - 200))
    },
    clearHoles() {
      for (let i = 0; i < this.holes.length; i++) {
        if (this.$set) this.$set(this.holes, i, { active: false })
        else this.holes[i] = { active: false }
      }
    },
    hit(idx) {
      if (!this.running) return
      if (this.holes[idx].active) {
        this.score += 1
        if (this.$set) this.$set(this.holes, idx, { active: false })
        else this.holes[idx] = { active: false }
      }
    }
  }
}
</script>

<style scoped>
</style>
