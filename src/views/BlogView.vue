<template>
  <div class="section-container py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <SectionHeader title="Games" subtitle="Pilih game favoritmu dan mulai bermain!" align="left" />

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap -mx-1 px-1">
        <button
          class="btn-base rounded-2xl border flex-none"
          :class="selected === 'shooter' ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
          @click="selected = 'shooter'"
        >Shooter</button>
        <button
          class="btn-base rounded-2xl border flex-none"
          :class="selected === 'tictactoe' ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
          @click="selected = 'tictactoe'"
        >Tic-Tac-Toe</button>
        <button
          class="btn-base rounded-2xl border flex-none"
          :class="selected === 'rps' ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
          @click="selected = 'rps'"
        >Batu Gunting Kertas</button>
        <button
          class="btn-base rounded-2xl border flex-none"
          :class="selected === 'snake' ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
          @click="selected = 'snake'"
        >Snake</button>
        <button
          class="btn-base rounded-2xl border flex-none"
          :class="selected === 'whack' ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
          @click="selected = 'whack'"
        >Whack‑a‑Mole</button>
      </div>

      <!-- Game Wrapper -->
      <div class="glass-card p-4 md:p-6">
        <component :is="activeComponent" />
      </div>
    </div>
  </div>
  
  
  
  
  
  
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import GameShooter from '@/components/GameShooter.vue';
import GameTicTacToe from '@/components/GameTicTacToe.vue';
import GameRockPaper from '@/components/GameRockPaper.vue';
import GameSnake from '@/components/GameSnake.vue';
import GameWhack from '@/components/GameWhack.vue';

export default {
  components: {
    SectionHeader,
    GameShooter,
    GameTicTacToe,
    GameRockPaper,
    GameSnake,
    GameWhack,
  },
  data() {
    return {
      selected: 'shooter',
    }
  },
  computed: {
    activeComponent() {
      if (this.selected === 'shooter') return 'GameShooter'
      if (this.selected === 'tictactoe') return 'GameTicTacToe'
      if (this.selected === 'rps') return 'GameRockPaper'
      if (this.selected === 'snake') return 'GameSnake'
      if (this.selected === 'whack') return 'GameWhack'
      return 'GameShooter'
    }
  }
}

</script>

<style scoped>
.paraf {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
 }
/* Hide scrollbar on tabs when overflow-x enabled */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
@media (min-width: 768px) { 
  .paraf {
    display: -webkit-box;
  }
}
@keyframes fadeZoomUp {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.fade-zoom-up {
  animation: fadeZoomUp 1s ease-in-out;
  /* animation-delay: 1000ms; */
}
</style>