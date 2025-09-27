<template>
  <div class="w-full h-full flex flex-col">
    <!-- Top bar: score + controls -->
    <div class="p-3 md:p-4 flex flex-wrap items-center gap-3 justify-between border-b border-white/10 bg-white/5">
      <div class="flex items-center gap-4 text-white/90 text-sm md:text-base">
        <div class="flex items-center gap-2">
          <span class="opacity-70">Waktu</span>
          <span class="font-semibold">{{ timeDisplay }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="opacity-70">Langkah</span>
          <span class="font-semibold">{{ moves }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="opacity-70">Cocok</span>
          <span class="font-semibold">{{ matched }}/{{ totalPairs }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-2 rounded-lg bg-amber-300 text-black font-semibold px-3 py-1.5" @click="resetGame">
          Reset
        </button>
        <button class="inline-flex items-center gap-2 rounded-lg bg-white/10 text-white hover:bg-white/20 px-3 py-1.5" @click="shuffleAndStart">
          New
        </button>
      </div>
    </div>

    <!-- Board -->
    <div class="flex-1 overflow-auto p-3 md:p-5">
      <div class="mx-auto max-w-5xl">
        <!-- Responsive grid: auto-fit square cards -->
        <div
          class="grid gap-3 sm:gap-4"
          :style="{
            gridTemplateColumns: gridTemplate,
          }"
        >
          <button
            v-for="(card, idx) in cards"
            :key="card.uid"
            class="relative rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
            :disabled="card.matched || disabled"
            @click="flip(idx)"
          >
            <div class="relative w-full" :class="'aspect-square'">
              <!-- Card faces -->
              <div class="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300"
                   :style="{ transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
                <!-- Front (hidden) -->
                <div class="absolute inset-0 backface-hidden rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                  <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10"></div>
                </div>
                <!-- Back (icon) -->
                <div class="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 grid place-items-center [transform:rotateY(180deg)] backface-hidden">
                  <span class="text-2xl md:text-3xl">{{ card.symbol }}</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- Win state -->
        <div v-if="matched === totalPairs" class="mt-6 text-center text-white/90">
          <div class="text-lg md:text-xl font-semibold">Keren! Semua pasangan ditemukan 🎉</div>
          <div class="opacity-80 mt-1">Waktu {{ timeDisplay }} • Langkah {{ moves }}</div>
          <div class="mt-4">
            <button class="inline-flex items-center gap-2 rounded-lg bg-amber-300 text-black font-semibold px-4 py-2" @click="shuffleAndStart">
              Main Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryMatch',
  data() {
    return {
      baseSymbols: ['🍎','🍌','🍓','🍇','🍉','🍒','🍍','🥝','🥕','🌽','🫐','🥑'],
      pairCount: 8, // adjusts difficulty responsively later
      cards: [],
      openIdx: null,
      disabled: false,
      moves: 0,
      matched: 0,
      timer: null,
      elapsed: 0,
    }
  },
  computed: {
    totalPairs() { return this.pairCount },
    timeDisplay() {
      const s = Math.floor(this.elapsed / 1000)
      const mm = String(Math.floor(s / 60)).padStart(2, '0')
      const ss = String(s % 60).padStart(2, '0')
      return `${mm}:${ss}`
    },
    // create a responsive grid template with min card size
    gridTemplate() {
      // choose a min size that works well on mobile
      const min = 90 // px
      return `repeat(auto-fit, minmax(${min}px, 1fr))`
    },
  },
  mounted() {
    this.setupDifficulty()
    this.shuffleAndStart()
    window.addEventListener('resize', this.setupDifficulty)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setupDifficulty)
    this.stopTimer()
  },
  methods: {
    setupDifficulty() {
      // Adjust pair count based on viewport width
      const w = window.innerWidth
      if (w < 380) this.pairCount = 6
      else if (w < 560) this.pairCount = 8
      else if (w < 820) this.pairCount = 10
      else this.pairCount = 12
    },
    shuffleAndStart() {
      this.stopTimer()
      this.elapsed = 0
      this.moves = 0
      this.matched = 0
      this.openIdx = null
      this.disabled = false

      const symbols = this.baseSymbols.slice(0, this.pairCount)
      const pool = [...symbols, ...symbols].map((s, i) => ({
        uid: `${s}-${i}-${Math.random().toString(36).slice(2,6)}`,
        symbol: s,
        flipped: false,
        matched: false,
      }))
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[pool[i], pool[j]] = [pool[j], pool[i]]
      }
      this.cards = pool
      this.startTimer()
    },
    startTimer() {
      const start = performance.now() - this.elapsed
      this.timer = setInterval(() => {
        this.elapsed = performance.now() - start
      }, 250)
    },
    stopTimer() {
      if (this.timer) { clearInterval(this.timer); this.timer = null }
    },
    flip(idx) {
      if (this.disabled) return
      const card = this.cards[idx]
      if (!card || card.flipped || card.matched) return

      card.flipped = true
      if (this.openIdx === null) {
        this.openIdx = idx
        return
      }

      // second card
      this.moves++
      const first = this.cards[this.openIdx]
      if (first && first.symbol === card.symbol) {
        // match
        first.matched = true
        card.matched = true
        this.matched++
        this.openIdx = null
        if (this.matched === this.totalPairs) this.stopTimer()
      } else {
        // not a match -> flip back after delay
        this.disabled = true
        setTimeout(() => {
          first && (first.flipped = false)
          card.flipped = false
          this.openIdx = null
          this.disabled = false
        }, 700)
      }
    },
    resetGame() {
      this.shuffleAndStart()
    }
  }
}
</script>

<style scoped>
.backface-hidden { backface-visibility: hidden; }
/* Safe padding for mobile notches */
.p-safe { padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); }
</style>
