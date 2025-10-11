<template>
  <!-- component -->
  <!-- This is an example component -->
  <!-- Bokeh orbs background -->
  <BokehOrbs />
  <!-- Fullscreen intro: blocks interactions and auto-dismisses -->
  <FuzzyIntroOverlay
    v-if="showIntro"
    title="Febrian Pane"
    tagline="Frontend Developer • UI/UX"
    :duration-ms="3100"
    @done="showIntro=false"
  />
  <GalaxyBackground
    :meteor="true"
    :meteorCount="3"
    :speedMultiplier="0.9"
    :showerEvery="15"
    :showerBurst="2"
    :angleBaseDeg="65"
    :angleSpreadDeg="35"
    :trailPreset="theme === 'dark' ? 'amber' : 'rainbow'"
    :trailWidth="1"
    :starDensityDivisor="18000"
    :maxStars="160"
    :maxDpr="1.5"
    :respectReducedMotion="false"
  />
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="fixed inset-x-0 top-0 z-[98] w-full border-b border-black/10 dark:border-[#2a2a2a] backdrop-blur-md bg-white/80 dark:bg-[#121212]/80">
      <div class="max-w-7xl mx-auto px-5 py-1 md:py-1.5">
        <!-- Mobile: Logo left, hamburger right -->
        <div class="flex md:hidden items-center justify-between h-9">
          <button @click="redirectToHome" class="flex items-center max-w-[55vw]" aria-label="Go to Home">
            <GlitchText
              children="Febrian"
              :speed="0.5"
              :enable-shadows="true"
              :enable-on-hover="true"
              class-name="matura-font !text-[1.25rem] !font-semibold !mx-0 max-w-full truncate leading-none"
              :class="theme === 'dark' ? '!text-amber-200' : '!text-slate-900'"
            />
          </button>
          
          <div class="flex items-center gap-3">
            <!-- Theme toggle -->
            <button @click="toggleTheme" class="inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-white hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffdb70] focus:ring-offset-transparent" aria-label="Toggle theme">
              <svg v-if="theme==='dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.5 1 1 0 0 0-.11-1A1 1 0 0 0 8 1a10 10 0 1 0 11.31 11.31 1 1 0 0 0 .33-.76Z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4a1 1 0 0 0 1-1V1h-2v2a1 1 0 0 0 1 1zm0 16a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1zM4 13a1 1 0 0 0-1-1H1v2h2a1 1 0 0 0 1-1zm19 0a1 1 0 0 0-1-1h-2v2h2a1 1 0 0 0 1-1zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm13.21-.38l-1.79 1.8-1.42-1.42 1.8-1.79 1.41 1.41zM12 6a6 6 0 1 0 6 6 6.01 6.01 0 0 0-6-6z"/>
              </svg>
            </button>
            <!-- Hamburger -->
            <button @click="mobileOpen = !mobileOpen" class="inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-white hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffdb70] focus:ring-offset-transparent" :aria-expanded="mobileOpen.toString()" aria-label="Toggle navigation">
              <svg v-if="!mobileOpen" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop: Left menu | Center logo | Right menu + theme -->
        <div class="hidden md:grid md:grid-cols-3 md:items-center md:gap-4">
          <!-- Left menu -->
          <ul class="flex items-center justify-start space-x-6 text-sm font-medium">
            <li>
              <a href="/#home" @click="mobileOpen=false; socialOpen=false"
                class="fadein-bot text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2"
                :class="{ 'active-link': activeSection === 'home' }"
                aria-current="page">Home</a>
            </li>
            <li>
              <a href="/#about" @click="mobileOpen=false; socialOpen=false"
                class="fadein-bot fadein-1 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2"
                :class="{ 'active-link': activeSection === 'about' }">About</a>
            </li>
          </ul>

          <!-- Center logo (desktop) -->
          <div class="flex items-center justify-center px-2 h-9 md:h-11">
            <button @click="redirectToHome" class="flex items-center" aria-label="Go to Home">
              <GlitchText
                children="Febrian"
                :speed="0.5"
                :enable-shadows="true"
                :enable-on-hover="true"
                class-name="matura-font !text-[1.375rem] !font-semibold !mx-0 leading-none"
                :class="theme === 'dark' ? '!text-amber-200' : '!text-slate-900'"
              />
            </button>
          </div>

          <!-- Right menu + theme -->
          <div class="flex items-center justify-end space-x-6">
            <ul class="flex items-center space-x-6 text-sm font-medium">
              <li>
                <a href="/#portfolio" @click="mobileOpen=false; socialOpen=false"
                  class="fadein-bot fadein-2 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2"
                  :class="{ 'active-link': activeSection === 'portfolio' }">Portofolio</a>
              </li>
              <li>
                <a href="/#contact" @click="mobileOpen=false; socialOpen=false" class="fadein-bot fadein-3 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white py-2" :class="{ 'active-link': activeSection === 'contact' }">
                  Contact
                </a>
              </li>
              
              
            </ul>
            <!-- Theme toggle -->
            <button @click="toggleTheme" class="inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-white hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffdb70] focus:ring-offset-transparent" aria-label="Toggle theme">
              <svg v-if="theme==='dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.5 1 1 0 0 0-.11-1A1 1 0 0 0 8 1a10 10 0 1 0 11.31 11.31 1 1 0 0 0 .33-.76Z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4a1 1 0 0 0 1-1V1h-2v2a1 1 0 0 0 1 1zm0 16a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1zM4 13a1 1 0 0 0-1-1H1v2h2a1 1 0 0 0 1-1zm19 0a1 1 0 0 0-1-1h-2v2h2a1 1 0 0 0 1-1zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm13.21-.38l-1.79 1.8-1.42-1.42 1.8-1.79 1.41 1.41zM12 6a6 6 0 1 0 6 6 6.01 6.01 0 0 0-6-6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile dropdown menu -->
      <transition name="fade" mode="out-in">
        <div v-if="mobileOpen" class="md:hidden border-t border-black/10 dark:border-[#2a2a2a]">
          <ul class="px-4 py-2 space-y-1">
            <li>
              <a href="/#home" @click="mobileOpen=false; socialOpen=false" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/#about" @click="mobileOpen=false; socialOpen=false" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>About</span>
              </a>
            </li>
            <li>
              <a href="/#portfolio" @click="mobileOpen=false; socialOpen=false" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Portofolio</span>
              </a>
            </li>
            <li>
              <a href="/#contact" @click="mobileOpen=false; socialOpen=false" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Contact</span>
              </a>
            </li>
            
            
          </ul>
        </div>
      </transition>
    </nav>

    <div class="mt-[70px] md:mt-[80px]">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Global footer curved loop -->
    <footer class="mt-6">
      <CurvedLoop
        marquee-text="BUILD ✦ CODE ✦ CREATE ✦ INNOVATE ✦ INSPIRE ✦"
        :speed="2"
        :curve-amount="300"
        direction="left"
        :interactive="true"
      />
    </footer>

    <!-- Floating Social Buttons -->
    <div class="fixed bottom-6 sm:bottom-8 md:bottom-10 right-4 sm:right-5 md:right-6 z-[99] group">
      <!-- Child buttons -->
      <div class="flex flex-col items-end space-y-2 mb-2 transition duration-200 ease-out origin-bottom-right opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
           :class="socialOpen ? 'opacity-100 scale-100' : ''">
        <!-- LinkedIn -->
        <a href="https://id.linkedin.com/in/febrian-sitorus" target="_blank" rel="noopener" aria-label="Open LinkedIn"
           class="inline-flex items-center">
          <span class="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow">
            <img class="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn" />
          </span>
        </a>
        <!-- Instagram -->
        <a href="https://www.instagram.com/febrianpane/." target="_blank" rel="noopener" aria-label="Open Instagram"
           class="inline-flex items-center">
          <span class="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow">
            <img class="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" />
          </span>
        </a>
        <!-- GitHub -->
        <a href="https://github.com/Febrianpane" target="_blank" rel="noopener" aria-label="Open GitHub"
           class="inline-flex items-center">
          <span class="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow text-white/90">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </span>
        </a>
      </div>

      <!-- Main FAB toggle (mobile) -->
      <button @click="socialOpen = !socialOpen" aria-label="Toggle social links"
              class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#ffdb70] text-black shadow-lg hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#ffdb70]/60">
        <svg v-if="!socialOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16M12 4v16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Cursor sparkle + dust overlay -->
  <AudioPlayer title="Background Music" :src="songUrl" />
  <CursorEffects />
</template>

<script>
import CurvedLoop from '@/components/CurvedLoop.vue'
import GlitchText from './components/GlitchText.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import GalaxyBackground from './components/GalaxyBackground.vue'
import CursorEffects from './components/CursorEffects.vue'
import BokehOrbs from './components/BokehOrbs.vue'
import FuzzyIntroOverlay from './components/FuzzyIntroOverlay.vue'
import songAsset from '@/assets/song.mp3'

export default {
  components: { GlitchText, AudioPlayer, CurvedLoop, GalaxyBackground, CursorEffects, BokehOrbs, FuzzyIntroOverlay },
  data() {
    return {
      songUrl: songAsset,
      
      mobileOpen: false,
      socialOpen: false,
      theme: 'dark',
      vw: (typeof window !== 'undefined' ? window.innerWidth : 1024),
      activeSection: 'home',
      showIntro: true,
    }
  },
  computed: {
    isMobile() {
      return this.vw < 640
    }
  },
  methods: {
    redirectToHome() {
      // Use native hash navigation + CSS scroll-padding-top
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/', hash: '#home' }).catch(() => {})
      } else {
        if (window.location.hash !== '#home') {
          window.location.hash = 'home'
        } else {
          const el = document.getElementById('home')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    },
    
    applyTheme() {
      const root = document.documentElement
      if (this.theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem('theme', this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
    },
    // Single native scroll using anchor target and CSS scroll-padding-top
    _performScroll(sectionId, maxTries = 40, intervalMs = 50) {
      let tries = 0
      const attempt = () => {
        const el = document.getElementById(sectionId)
        if (!el) { if (tries++ < maxTries) return setTimeout(attempt, intervalMs); return }
        const target = el.querySelector('[data-scroll-target]') || el
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        this.activeSection = sectionId
      }
      attempt()
    },
    async scrollToSection(sectionId, event) {
      if (event) {
        event.preventDefault()
      }
      this.mobileOpen = false
      this.socialOpen = false

      // Use native hash and a single scroll; rely on CSS offset
      if (this.$route.path !== '/') {
        try { await this.$router.push('/') } catch (e) { void 0 }
      }
      if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(history.state, '', `#${sectionId}`)
      }
      this._performScroll(sectionId)
    },
    updateActiveSection() {
      const sections = ['home', 'about', 'portfolio', 'contact']
      const navHeight = 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= navHeight && rect.bottom >= navHeight) {
            this.activeSection = sections[i]
            break
          }
        }
      }
    }
  },
  mounted() {
    // Track viewport width for responsive logo sizing
    this._onResize = () => { this.vw = window.innerWidth }
    window.addEventListener('resize', this._onResize)
    
    // Track scroll position to update active section
    this._onScroll = () => {
      this.updateActiveSection()
    }
    window.addEventListener('scroll', this._onScroll, { passive: true })
    
    // Initialize theme
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      this.theme = saved
    } else {
      // fallback to prefers-color-scheme, default to dark
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      this.theme = prefersDark ? 'dark' : 'dark'
    }
    this.applyTheme()
    
    // Handle hash navigation on load (single scroll)
    this.$nextTick(() => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        setTimeout(() => { this._performScroll(hash) }, 300)
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('scroll', this._onScroll)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap');
html, body, #app {
  width: 100%;
  overflow-x: hidden; /* prevent horizontal scroll due to background or 100vw issues */
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px; /* for vertical scrollbar */
  height: 5px; /* for horizontal scrollbar */
}

::-webkit-scrollbar-track {
  background: hsl(240, 1%, 17%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #ffdb70;
  border-radius: 5px;
}

::-webkit-scrollbar-button { width: 20px; }

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
}

nav {
  padding: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s;
}

nav a.router-link-exact-active,
nav a.active-link {
  display: inline-flex;
  flex-direction: column;
  color: white;
  transition: color 0.3s;
}

nav a.router-link-exact-active::after,
nav a.active-link::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #ffdb70;
}

nav a.router-link-exact-active:hover,
nav a.active-link:hover {
  color: white;
}

/* Global anchor offset for fixed navbar */
html { scroll-padding-top: 100px; }
@media (max-width: 767px) { html { scroll-padding-top: 220px; } }
@media (max-width: 639px) { html { scroll-padding-top: 260px; } }

/* Simple fade transition for mobile dropdown */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }


@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.blackletter-font {
  font-family: 'EB Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Brand font: prefer 'Matura MT Script Capitals' if available on the client. */
.matura-font {
  font-family: 'Matura MT Script Capitals', 'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', cursive;
  font-weight: 600;
  letter-spacing: 0.02em;
}

</style>
