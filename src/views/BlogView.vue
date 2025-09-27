<template>
  <div class="section-container py-10">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <SectionHeader title="Playground" subtitle="Pilih game favoritmu dan mulai bermain!" align="left" />

      <!-- Controls: Search + Categories -->
      <div class="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="relative w-full md:max-w-sm">
          <input
            v-model.trim="q"
            type="text"
            placeholder="Cari game..."
            class="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-300/40"
            @keydown.escape="q = ''"
          />
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">/</span>
        </div>

        <div class="flex flex-wrap gap-2 overflow-x-auto no-scrollbar whitespace-nowrap -mx-1 px-1">
          <button
            v-for="c in categories" :key="c.value"
            class="btn-base rounded-2xl border flex-none"
            :class="selectedCat === c.value ? 'bg-amber-300 text-black border-amber-200' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'"
            @click="selectedCat = c.value"
          >{{ c.label }}</button>
        </div>
      </div>

      <!-- Grid of games -->
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        <div
          v-for="g in filteredGames" :key="g.id"
          class="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
          @click="openGame(g)"
        >
          <div class="aspect-video w-full overflow-hidden">
            <img
              :src="g.thumb"
              :alt="g.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          <div class="p-3 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <div class="text-sm font-semibold text-white truncate">{{ g.title }}</div>
              <div class="text-xs text-white/60 truncate">{{ g.category }}</div>
            </div>
            <button class="shrink-0 inline-flex items-center gap-1 rounded-lg bg-amber-300 text-black text-xs font-semibold px-2 py-1">
              Main
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 6v12l10-6-10-6z"/></svg>
            </button>
          </div>
          <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/20"></div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredGames.length === 0" class="mt-10 text-center text-white/70">
        Tidak ada game yang cocok. Coba kata kunci lain atau kategori berbeda.
      </div>
    </div>

    <!-- Modal player -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-safe" @keydown.esc="closeModal" tabindex="-1">
        <div class="relative w-full h-full md:max-w-5xl md:h-[80vh] bg-black md:rounded-xl overflow-hidden border border-white/10">
          <!-- Back button (Kembali) -->
          <button @click="closeModal" class="absolute top-2 left-2 z-10 inline-flex items-center gap-2 rounded-lg bg-white/10 text-white hover:bg-white/20 px-3 py-1.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            Kembali
          </button>
          <!-- Close button -->
          <button @click="closeModal" class="absolute top-2 right-2 z-10 inline-flex items-center gap-2 rounded-lg bg-white/10 text-white hover:bg-white/20 px-3 py-1.5">
            Keluar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71L12 12.01 5.7 5.7 4.29 7.11l6.3 6.3-6.3 6.29 1.41 1.41 6.3-6.29 6.29 6.29 1.41-1.41-6.29-6.29 6.29-6.3z"/></svg>
          </button>

          <template v-if="activeGame && activeGame.type === 'iframe'">
            <iframe
              :src="activeGame.url"
              title="Game"
              class="w-full h-full bg-black"
              loading="lazy"
              allowfullscreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-popups allow-forms"
            ></iframe>
          </template>
          <template v-else-if="activeGame && activeGame.type === 'internal'">
            <component :is="activeGame.component" class="w-full h-full" />
          </template>
          <template v-else>
            <div class="h-full flex items-center justify-center text-white/70">Game tidak tersedia.</div>
          </template>
        </div>
      </div>
    </transition>
  </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
export default {
  name: 'BlogView',
  components: { SectionHeader },
  data() {
    return {
      q: '',
      selectedCat: 'all',
      categories: [
        { value: 'all', label: 'Semua' },
        { value: 'arcade', label: 'Arcade' },
        { value: 'puzzle', label: 'Puzzle' },
        { value: 'action', label: 'Action' },
        { value: 'strategy', label: 'Strategy' },
      ],
      showModal: false,
      activeGame: null,
      games: [
        // Internal, ad-free
        { id: 'memory', title: 'Memory Match', category: 'Puzzle', type: 'internal', component: () => import('@/games/MemoryMatch.vue'), thumb: '/thumbs/memory.svg' },
        // External (iframe-friendly). Note: Some sites may restrict embedding depending on CSP.
        { id: '2048', title: '2048', category: 'Puzzle', type: 'iframe', url: 'https://play2048.co/', thumb: '/thumbs/2048.svg' },
        { id: 'flappy', title: 'Flappy Clone', category: 'Arcade', type: 'iframe', url: 'https://flappybird.io/', thumb: '/thumbs/flappy.svg' },
        { id: 'simon', title: 'Simon Says', category: 'Arcade', type: 'iframe', url: 'https://playsimonsays.online/', thumb: '/thumbs/simon.svg' },
        { id: 'minesweeper', title: 'Minesweeper', category: 'Strategy', type: 'iframe', url: 'https://minesweeperonline.com/', thumb: '/thumbs/minesweeper.svg' },
        { id: 'tetris', title: 'Tetris', category: 'Puzzle', type: 'iframe', url: 'https://tetris.com/play-tetris', thumb: '/thumbs/tetris.svg' },
      ],
    }
  },
  computed: {
    filteredGames() {
      const q = this.q.toLowerCase()
      return this.games.filter(g => {
        const inQ = !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)
        const inCat = this.selectedCat === 'all' || g.category.toLowerCase() === this.selectedCat
        return inQ && inCat
      })
    }
  },
  methods: {
    openGame(game) {
      // if internal game uses a loader function, wrap it with defineAsyncComponent
      if (game.type === 'internal' && typeof game.component === 'function') {
        this.activeGame = { ...game, component: defineAsyncComponent(game.component) }
      } else {
        this.activeGame = game
      }
      this.showModal = true
      try { document.documentElement.style.overflow = 'hidden' } catch (e) { void 0 }
      // push history state so browser back closes modal
      try { history.pushState({ gameModal: true }, '', '#play') } catch (e) { void 0 }
    },
    closeModal() {
      // if we pushed a state, prefer using back to trigger popstate
      if (typeof history !== 'undefined' && history.state && history.state.gameModal) {
        try { history.back(); return } catch (e) { /* fallback below */ }
      }
      this.showModal = false
      this.activeGame = null
      try { document.documentElement.style.overflow = '' } catch (e) { void 0 }
    }
  },
  mounted() {
    this._onPop = () => {
      if (this.showModal) {
        this.showModal = false
        this.activeGame = null
        try { document.documentElement.style.overflow = '' } catch (e) { void 0 }
      }
    }
    window.addEventListener('popstate', this._onPop)
  },
  beforeUnmount() {
    if (this._onPop) window.removeEventListener('popstate', this._onPop)
  }
}
</script>

<style scoped>
.btn-base { padding: 0.5rem 1rem; font-weight: 600; transition: all .2s ease; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>