<template>
  <div class="container mx-auto p-3 md:p-8 text-white">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
          Memory Match
        </h1>
        <p class="text-slate-300 text-sm">Cocokkan pasangan kartu. Selesaikan dengan langkah sesedikit mungkin!</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-4 py-2 flex items-center gap-2">
          <span class="text-xs text-slate-400">Moves</span>
          <span class="font-semibold">{{ moves }}</span>
        </div>
        <div class="bg-[#1e1e1f] border border-[#383838] rounded-lg px-4 py-2 flex items-center gap-2">
          <span class="text-xs text-slate-400">Time</span>
          <span class="font-semibold">{{ formattedTime }}</span>
        </div>
        <button @click="resetGame" class="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm transition-all">
          Reset
        </button>
      </div>
    </div>

    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
      <button
        v-for="(card, idx) in cards"
        :key="card.uid"
        :disabled="card.matched || disabled"
        class="relative aspect-square rounded-xl focus:outline-none"
        @click="flipCard(idx)"
      >
        <div class="w-full h-full rounded-xl border border-[#383838] bg-[#1e1e1f] overflow-hidden cursor-pointer select-none transform transition-transform duration-300"
             :class="{ 'rotate-y-180': card.flipped || card.matched }">
          <!-- Back side -->
          <div class="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-bold tracking-wider bg-gradient-to-br from-slate-800 to-slate-900">
            ?
          </div>
          <!-- Front side -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center text-2xl md:text-3xl">
            <span class="drop-shadow-md">{{ card.symbol }}</span>
          </div>
        </div>
      </button>
    </div>

    <div v-if="won" class="mt-6 p-4 rounded-xl border border-emerald-700 bg-emerald-900/30 text-emerald-200 text-center">
      <div class="text-lg font-semibold">Selamat! Kamu menang! 🎉</div>
      <div class="text-sm">Waktu: {{ formattedTime }} • Langkah: {{ moves }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameMemory',
  data() {
    return {
      baseSymbols: ['🐶','🐱','🦊','🐼','🐨','🦁','🐸','🐵','🦄','🐢','🐙','🐥'],
      cards: [],
      firstIndex: null,
      secondIndex: null,
      disabled: false,
      moves: 0,
      seconds: 0,
      timerId: null,
      started: false,
    }
  },
  computed: {
    won() {
      return this.cards.length > 0 && this.cards.every(c => c.matched)
    },
    formattedTime() {
      const m = Math.floor(this.seconds / 60).toString().padStart(2, '0')
      const s = (this.seconds % 60).toString().padStart(2, '0')
      return `${m}:${s}`
    }
  },
  mounted() {
    this.startNewGame()
  },
  beforeUnmount() {
    this.clearTimer()
  },
  methods: {
    startNewGame() {
      const pick = 8 // 8 pairs -> 16 cards
      const symbols = this.shuffle([...this.baseSymbols]).slice(0, pick)
      const pairs = symbols.flatMap(sym => [sym, sym])
      const deck = this.shuffle(pairs).map((sym, i) => ({
        uid: `${sym}-${i}-${Math.random().toString(36).slice(2,7)}`,
        symbol: sym,
        flipped: false,
        matched: false,
      }))
      this.cards = deck
      this.firstIndex = null
      this.secondIndex = null
      this.disabled = false
      this.moves = 0
      this.seconds = 0
      this.started = false
      this.clearTimer()
    },
    resetGame() {
      this.startNewGame()
    },
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    tick() {
      this.seconds += 1
    },
    startTimerOnce() {
      if (!this.started) {
        this.started = true
        this.timerId = setInterval(this.tick, 1000)
      }
    },
    clearTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    },
    async flipCard(idx) {
      if (this.disabled) return
      const card = this.cards[idx]
      if (card.flipped || card.matched) return

      this.startTimerOnce()

      card.flipped = true
      if (this.firstIndex === null) {
        this.firstIndex = idx
        return
      }

      if (this.secondIndex === null) {
        this.secondIndex = idx
        this.disabled = true
        this.moves += 1

        const first = this.cards[this.firstIndex]
        const second = this.cards[this.secondIndex]

        if (first.symbol === second.symbol) {
          // match
          setTimeout(() => {
            first.matched = true
            second.matched = true
            this.resetTurn()
            if (this.won) this.clearTimer()
          }, 300)
        } else {
          // not match
          setTimeout(() => {
            first.flipped = false
            second.flipped = false
            this.resetTurn()
          }, 700)
        }
      }
    },
    resetTurn() {
      this.firstIndex = null
      this.secondIndex = null
      this.disabled = false
    }
  }
}
</script>

<style scoped>
/***** Simple 3D flip effect *****/
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
}
button > div {
  transform-style: preserve-3d;
}
</style>
