<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="fixed inset-x-0 top-0 z-[98] w-full border-b border-black/10 dark:border-[#2a2a2a] backdrop-blur-md bg-white/80 dark:bg-[#121212]/80">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-5 py-2 md:py-3">
        <button @click="redirectToHome" class="flex items-center" aria-label="Go to Home">
          <LiquidText class="fadein-bot hover:brightness-110"
            text="Febrian Sitorus"
            :width="230"
            :height="34"
            :fontSize="22"
            fontFamily="EB Garamond, serif"
            fontWeight="600"
          />
        </button>

        <!-- Right side: socials on md+, hamburger on mobile -->
        <div class="flex items-center gap-2 md:order-2">
          <!-- Theme toggle -->
          <button @click="toggleTheme" class="inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-white hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffdb70] focus:ring-offset-transparent" aria-label="Toggle theme">
            <svg v-if="theme==='dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.5 1 1 0 0 0-.11-1A1 1 0 0 0 8 1a10 10 0 1 0 11.31 11.31 1 1 0 0 0 .33-.76Z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4a1 1 0 0 0 1-1V1h-2v2a1 1 0 0 0 1 1zm0 16a1 1 0 0 0-1 1v2h2v-2a1 1 0 0 0-1-1zM4 13a1 1 0 0 0-1-1H1v2h2a1 1 0 0 0 1-1zm19 0a1 1 0 0 0-1-1h-2v2h2a1 1 0 0 0 1-1zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zm13.21-.38l-1.79 1.8-1.42-1.42 1.8-1.79 1.41 1.41zM12 6a6 6 0 1 0 6 6 6.01 6.01 0 0 0-6-6z"/>
            </svg>
          </button>
          <!-- Hamburger for mobile -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-white hover:bg-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffdb70] focus:ring-offset-transparent" :aria-expanded="mobileOpen.toString()" aria-label="Toggle navigation">
            <svg v-if="!mobileOpen" class="h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="menu-desktop">
          <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link to="/"
                class="fadein-bot text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0">About</router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-2 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0">Portofolio</router-link>
            </li>
            <li>
              <router-link to="/blog"
                class="fadein-bot fadein-3 text-slate-700 hover:text-black dark:text-gray-300 dark:hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0 blog">Games</router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile dropdown menu -->
      <transition name="fade" mode="out-in">
        <div v-if="mobileOpen" class="md:hidden border-t border-black/10 dark:border-[#2a2a2a]">
          <ul class="px-4 py-2 space-y-1">
            <li>
              <router-link to="/" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>About</span>
              </router-link>
            </li>
            <li>
              <router-link to="/portfolio" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Portofolio</span>
              </router-link>
            </li>
            <li>
              <router-link to="/blog" class="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-[#1e1e1e]">
                <span>Games</span>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>

    <div class="mt-[70px] md:mt-[80px]">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>

    <!-- Floating Social Buttons -->
    <div class="fixed bottom-4 right-4 z-[99] group">
      <!-- Child buttons -->
      <div class="flex flex-col items-end space-y-2 mb-2 transition duration-200 ease-out origin-bottom-right opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
           :class="socialOpen ? 'opacity-100 scale-100' : ''">
        <!-- LinkedIn -->
        <a href="https://id.linkedin.com/in/febrian-sitorus" target="_blank" rel="noopener" aria-label="Open LinkedIn"
           class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs rounded-md bg-[#1e1e1e] text-white border border-white/10 shadow hidden sm:inline-block">LinkedIn</span>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow">
            <img class="w-5 h-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn" />
          </span>
        </a>
        <!-- Instagram -->
        <a href="https://www.instagram.com/febrianpane/." target="_blank" rel="noopener" aria-label="Open Instagram"
           class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs rounded-md bg-[#1e1e1e] text-white border border-white/10 shadow hidden sm:inline-block">Instagram</span>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow">
            <img class="w-5 h-5" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" />
          </span>
        </a>
        <!-- GitHub -->
        <a href="https://github.com/Febrianpane" target="_blank" rel="noopener" aria-label="Open GitHub"
           class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs rounded-md bg-[#1e1e1e] text-white border border-white/10 shadow hidden sm:inline-block">GitHub</span>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1e1e1e]/90 border border-white/10 hover:bg-[#2a2a2a] shadow">
            <img class="w-5 h-5" src="https://seeklogo.com/images/G/github-logo-2E3852456C-seeklogo.com.png" alt="GitHub" />
          </span>
        </a>
      </div>

      <!-- Main FAB toggle (mobile) -->
      <button @click="socialOpen = !socialOpen" aria-label="Toggle social links"
              class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffdb70] text-black shadow-lg hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#ffdb70]/60">
        <svg v-if="!socialOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16M12 4v16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Opening animation overlay -->
  <RobotIntro v-if="showIntro" @finished="onIntroFinished" />
  <!-- Cursor sparkle + dust overlay -->
  <CursorEffects />
</template>

<script>
import RobotIntro from './components/RobotIntro.vue'
import LiquidText from './components/LiquidText.vue'
import CursorEffects from './components/CursorEffects.vue'

export default {
  components: { RobotIntro, LiquidText, CursorEffects },
  data() {
    return {
      showIntro: true,
      mobileOpen: false,
      socialOpen: false,
      theme: 'dark',
      // Edge-only route navigation state
      isEdgeNavigating: false,
      lastEdgeNavAt: 0,
      routeOrder: ['/', '/about', '/portfolio', '/blog'],
    }
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    },
    onIntroFinished() {
      this.showIntro = false
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
    onWheelEdgeNavigate(e) {
      // Only consider route navigation when at scroll edges
      if (this.showIntro || this.mobileOpen) return;

      const now = Date.now();
      const cooldown = 900; // ms
      if (this.isEdgeNavigating || now - this.lastEdgeNavAt < cooldown) return;

      const deltaY = e.deltaY || 0;
      if (Math.abs(deltaY) < 20) return; // ignore tiny scrolls

      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const threshold = 8; // px allowance
      const atTop = scrollTop <= threshold;
      const atBottom = scrollTop + viewport >= docHeight - threshold;

      const currentPath = this.$route.path;
      const idx = this.routeOrder.indexOf(currentPath);
      if (idx === -1) return;

      let targetIdx = idx;
      if (deltaY > 0 && atBottom && idx < this.routeOrder.length - 1) {
        targetIdx = idx + 1;
      } else if (deltaY < 0 && atTop && idx > 0) {
        targetIdx = idx - 1;
      }

      if (targetIdx !== idx) {
        // prevent native scroll only when we are navigating
        if (e.cancelable) e.preventDefault();
        this.isEdgeNavigating = true;
        this.lastEdgeNavAt = now;
        this.$router.push(this.routeOrder[targetIdx]).finally(() => {
          setTimeout(() => {
            this.isEdgeNavigating = false;
          }, cooldown);
        });
      }
    }
  },
  watch: {
    $route() {
      // Tutup menu saat navigasi halaman
      this.mobileOpen = false
      this.socialOpen = false
      // Scroll to top so the next view starts at the top (below fixed navbar)
      this.$nextTick(() => {
        // Use immediate scroll; the content container already has top margin for navbar
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }
  },
  mounted() {
    // Attach edge-only wheel navigation
    window.addEventListener('wheel', this.onWheelEdgeNavigate, { passive: false });
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
  },
  beforeUnmount() {
    window.removeEventListener('wheel', this.onWheelEdgeNavigate);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap');

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
  height: 100vh;
}

nav {
  padding: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  display: inline-flex;
  flex-direction: column;
  color: white;
  transition: color 0.3s;
}

nav a.router-link-exact-active::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #ffdb70;
}

nav a.router-link-exact-active:hover {
  color: white;
}

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

</style>
