<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="max-w-7xl px-5 fixed top-0 z-[98] w-screen border-b border-[#2a2a2a] backdrop-blur-md bg-[#121212] bg-opacity-80 relative">
      <div class="container mx-auto flex flex-wrap items-center justify-between py-2 md:py-3">
        <button @click="redirectToHome" class="flex">
          <span class="self-center text-base md:text-lg text-[#ffdb70] font-semibold whitespace-nowrap fadein-bot hover:text-amber-100 blackletter-font">Febrian Sitorus</span>
        </button>

        <!-- Right side: socials on md+, hamburger on mobile -->
        <div class="flex items-center md:order-2">
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
                class="fadein-bot text-gray-300 hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 text-gray-300 hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0">About</router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-2 text-gray-300 hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0">Portofolio</router-link>
            </li>
            <li>
              <router-link to="/blog"
                class="fadein-bot fadein-3 text-gray-300 hover:text-white md:border-0 block pl-3 pr-4 py-2 md:p-0 blog">Games</router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile dropdown menu -->
      <transition name="fade" mode="out-in">
        <div v-if="mobileOpen" class="md:hidden border-t border-[#2a2a2a]">
          <ul class="px-4 py-2 space-y-1">
            <li>
              <router-link to="/" class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-[#1e1e1e]">
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-[#1e1e1e]">
                <span>About</span>
              </router-link>
            </li>
            <li>
              <router-link to="/portfolio" class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-[#1e1e1e]">
                <span>Portofolio</span>
              </router-link>
            </li>
            <li>
              <router-link to="/blog" class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-200 hover:text-white hover:bg-[#1e1e1e]">
                <span>Games</span>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>

    <div class="mt-[52px] md:mt-[88px]">
      <router-view />
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
</template>

<script>
import RobotIntro from './components/RobotIntro.vue'

export default {
  components: { RobotIntro },
  data() {
    return {
      showIntro: true,
      mobileOpen: false,
      socialOpen: false,
    }
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    },
    onIntroFinished() {
      this.showIntro = false
    }
  },
  watch: {
    $route() {
      // Tutup menu saat navigasi halaman
      this.mobileOpen = false
      this.socialOpen = false
    }
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
  background: hsl(0, 0%, 7%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
