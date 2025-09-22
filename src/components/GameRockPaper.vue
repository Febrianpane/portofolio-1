<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl md:text-2xl font-bold">Batu • Gunting • Kertas</h2>
        <p class="text-slate-300 text-xs md:text-sm">Main melawan komputer. Skor duluan 5 menang!</p>
      </div>
      <button @click="reset" class="py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-sm">Reset</button>
    </div>

    <div class="flex items-center justify-center gap-3 md:gap-4 mb-5">
      <button v-for="opt in options" :key="opt.value" @click="pick(opt.value)"
              class="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
        <span class="text-xl">{{ opt.icon }}</span>
        <div class="text-xs text-slate-300 mt-1">{{ opt.label }}</div>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-3 max-w-md mx-auto">
      <div class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <div class="text-slate-300 text-xs">Kamu</div>
        <div class="text-2xl md:text-3xl">{{ humanIcon }}</div>
        <div class="mt-2 text-amber-300 font-semibold">{{ score.human }}</div>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <div class="text-slate-300 text-xs">Komputer</div>
        <div class="text-2xl md:text-3xl">{{ botIcon }}</div>
        <div class="mt-2 text-cyan-300 font-semibold">{{ score.bot }}</div>
      </div>
    </div>

    <div class="mt-4 text-center min-h-[1.5rem]">
      <div v-if="resultMsg" :class="resultClass" class="font-semibold">{{ resultMsg }}</div>
    </div>

    <div v-if="won" class="mt-4 p-4 rounded-xl border border-emerald-700 bg-emerald-900/30 text-emerald-200 text-center">Kamu menang pertandingan! 🎉</div>
    <div v-else-if="lost" class="mt-4 p-4 rounded-xl border border-rose-700 bg-rose-900/30 text-rose-200 text-center">Kamu kalah. Coba lagi! 💪</div>
  </div>
</template>

<script>
export default {
  name: 'GameRockPaper',
  data() {
    return {
      options: [
        { value: 'rock', label: 'Batu', icon: '🪨' },
        { value: 'paper', label: 'Kertas', icon: '📄' },
        { value: 'scissors', label: 'Gunting', icon: '✂️' },
      ],
      pickHuman: '',
      pickBot: '',
      score: { human: 0, bot: 0 },
      resultMsg: '',
    }
  },
  computed: {
    won() { return this.score.human >= 5 },
    lost() { return this.score.bot >= 5 },
    humanIcon() { return this.iconOf(this.pickHuman) || '❔' },
    botIcon() { return this.iconOf(this.pickBot) || '❔' },
    resultClass() {
      return this.resultMsg.includes('Menang') ? 'text-emerald-300' : this.resultMsg.includes('Kalah') ? 'text-rose-300' : 'text-slate-300'
    }
  },
  methods: {
    iconOf(val) {
      const found = this.options.find(o => o.value === val)
      return found ? found.icon : ''
    },
    reset() {
      this.pickHuman = ''
      this.pickBot = ''
      this.score = { human: 0, bot: 0 }
      this.resultMsg = ''
    },
    pick(val) {
      if (this.won || this.lost) return
      this.pickHuman = val
      const botChoices = ['rock','paper','scissors']
      this.pickBot = botChoices[Math.floor(Math.random() * botChoices.length)]
      this.judge()
    },
    judge() {
      const h = this.pickHuman
      const b = this.pickBot
      if (h === b) { this.resultMsg = 'Seri!' ; return }
      const win = (h === 'rock' && b === 'scissors') || (h === 'paper' && b === 'rock') || (h === 'scissors' && b === 'paper')
      if (win) {
        this.score.human++
        this.resultMsg = 'Menang ronde! ✅'
      } else {
        this.score.bot++
        this.resultMsg = 'Kalah ronde! ❌'
      }
    }
  }
}
</script>

<style scoped>
</style>
