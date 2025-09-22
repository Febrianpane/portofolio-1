<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Tic-Tac-Toe</h2>
        <p class="text-slate-300 text-xs md:text-sm">Giliran: <span class="font-semibold" :class="turnClass">{{ currentPlayer }}</span></p>
      </div>
      <button @click="reset" class="py-2 px-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:brightness-110 text-sm">Reset</button>
    </div>

    <div class="grid grid-cols-3 gap-2 w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] mx-auto">
      <button v-for="(cell, i) in board" :key="i"
              @click="play(i)"
              :disabled="!!cell || winner || draw"
              class="aspect-square rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-2xl md:text-3xl font-bold flex items-center justify-center">
        {{ cell }}
      </button>
    </div>

    <div class="mt-4 text-center">
      <div v-if="winner" class="text-emerald-300 font-semibold">Pemenang: {{ winner }} 🎉</div>
      <div v-else-if="draw" class="text-amber-300 font-semibold">Seri! 🤝</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTicTacToe',
  data() {
    return {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      winner: '',
      draw: false,
      lines: [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ]
    }
  },
  computed: {
    turnClass() {
      return this.currentPlayer === 'X' ? 'text-amber-300' : 'text-cyan-300'
    }
  },
  methods: {
    play(i) {
      if (this.board[i] || this.winner) return
      this.$set ? this.$set(this.board, i, this.currentPlayer) : (this.board[i] = this.currentPlayer)
      this.check()
      if (!this.winner && !this.draw) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
      }
    },
    check() {
      for (const [a,b,c] of this.lines) {
        if (this.board[a] && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
          this.winner = this.board[a]
          return
        }
      }
      if (this.board.every(v => v)) {
        this.draw = true
      }
    },
    reset() {
      this.board = Array(9).fill('')
      this.currentPlayer = 'X'
      this.winner = ''
      this.draw = false
    }
  }
}
</script>

<style scoped>
</style>
