<template>
  <main class="relative">
    <!-- Hero Section -->
    <section class="relative section-container pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 min-h-[70vh] flex items-center">
      <!-- Background decorations -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-10 -left-10 w-56 h-56 bg-amber-300/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        <!-- Left: Text -->
        <div class="text-center md:text-left order-2 md:order-1">
          <p class="text-amber-700 dark:text-amber-200 tracking-wide fade-in-from-left">Hello World, I'm</p>
          <h1 class="mt-2 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white retro-font fadein-up beat-scale">Febrian Sitorus</h1>
          <div class="py-3">
            <h2 class="typewrite text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-amber-500 dark:from-slate-100 dark:to-yellow-500 fadein-up" ref="typewriter">
              <span class="wrap">{{ txt }}</span>
            </h2>
          </div>
          <p class="text-slate-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0 fade-in-from-left">I craft modern, fast and accessible web experiences with a touch of creativity and clean design.
            <span class="wave">👋🏼</span>
          </p>

          <!-- CTAs -->
          <div class="mt-6 flex flex-wrap gap-3 justify-center md:justify-start fadein-bot fade-500">
            <a href="/resume.pdf" target="_blank" rel="noopener" class="btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-2 w-4 h-4"><path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd"></path><path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"></path></svg>
              Download Resume
            </a>
            <router-link to="/portfolio" class="btn-primary font-semibold">
              View Portfolio
            </router-link>
          </div>
        </div>

        <!-- Right: Avatar -->
        <div class="flex justify-center md:justify-end order-1 md:order-2 items-center fadein-right">
          <div class="relative inline-block">
            <img
              alt="Portrait of Febrian Sitorus"
              loading="lazy"
              width="1000"
              height="1000"
              decoding="async"
              class="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-4 animated-border pict object-cover"
              src="/profile.png"
            />
            <!-- Rainbow radial bars synced to music, clipped around photo circle -->
            <AvatarVisualizer
              :innerRatio="1.0"
              :useOuterWrapper="true"
              :gapOutside="2"
              :edgeOffset="0"
              imageSelector=".pict"
              :gain="1.2"
              :barWidth="3"
              :lengthScale="0.6"
              :bars="200"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="section-container py-16">
      <SectionHeader title="Tech Stack" subtitle="Tools I use to build" />
      <div class="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span class="badge">Vue 3</span>
        <span class="badge">Vue Router</span>
        <span class="badge">Tailwind CSS</span>
        <span class="badge">JavaScript (ESNext)</span>
        <span class="badge">Node.js</span>
        <span class="badge">Axios</span>
      </div>
    </section>

    <!-- Services / Offerings -->
    <section class="section-container py-16">
      <SectionHeader title="Services" subtitle="What I can help you build" />
      <div class="mt-8 section-grid">
        <!-- Service Card -->
        <div class="group glass-card glass-card-hover p-6 hover-lift">
          <div class="w-10 h-10 rounded-lg bg-amber-300/20 text-amber-200 flex items-center justify-center"> 
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 2.236L6 8v8l6 3.236L18 16V8l-6-2.764z"/></svg>
          </div>
          <h4 class="mt-3 text-slate-900 dark:text-white font-semibold">Frontend Development</h4>
          <p class="text-slate-700 dark:text-gray-400 text-sm mt-1">Modern, responsive UI with Vue 3 + Tailwind, optimized for performance and accessibility.</p>
        </div>
        <div class="group glass-card glass-card-hover p-6 hover-lift">
          <div class="w-10 h-10 rounded-lg bg-cyan-300/20 text-cyan-200 flex items-center justify-center"> 
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z"/></svg>
          </div>
          <h4 class="mt-3 text-slate-900 dark:text-white font-semibold">Full-stack Web</h4>
          <p class="text-slate-700 dark:text-gray-400 text-sm mt-1">From API integration to deployment, clean and maintainable structure ready for scale.</p>
        </div>
        <div class="group glass-card glass-card-hover p-6 hover-lift">
          <div class="w-10 h-10 rounded-lg bg-emerald-300/20 text-emerald-200 flex items-center justify-center"> 
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 7a5 5 0 015 5h3l-4 4-4-4h3a3 3 0 10-3-3V7z"/></svg>
          </div>
          <h4 class="mt-3 text-slate-900 dark:text-white font-semibold">Performance & SEO</h4>
          <p class="text-slate-700 dark:text-gray-400 text-sm mt-1">Audit and optimize Core Web Vitals, Lighthouse, and best practices.</p>
        </div>
        <div class="group glass-card glass-card-hover p-6 hover-lift">
          <div class="w-10 h-10 rounded-lg bg-fuchsia-300/20 text-fuchsia-200 flex items-center justify-center"> 
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z"/></svg>
          </div>
          <h4 class="mt-3 text-slate-900 dark:text-white font-semibold">UI/UX Design</h4>
          <p class="text-slate-700 dark:text-gray-400 text-sm mt-1">Design systems, wireframe to hi-fi prototypes with accessible components.</p>
        </div>
      </div>
    </section>

    <!-- Featured Metrics (Animated Counters) -->
    <section class="section-container py-16" ref="metricsSection">
      <SectionHeader title="Featured Metrics" />
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div v-for="m in metrics" :key="m.label" class="glass-card p-6 text-center">
          <div class="text-3xl md:text-4xl font-extrabold text-amber-300">{{ m.current }}</div>
          <div class="text-slate-700 dark:text-gray-300 text-xs md:text-sm mt-1">{{ m.label }}</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import AvatarVisualizer from '@/components/AvatarVisualizer.vue'
export default {
  name: 'HomeView',
  components: { SectionHeader, AvatarVisualizer },
  data() {
    return {
      toRotate: ["Frontend Developer", "Full-stack Developer", "Informatics Student", "UI UX Design"],
      period: 2000,
      txt: '',
      loopNum: 0,
      isDeleting: false,
      metrics: [
        { label: 'Projects', current: 0, target: 3 },
        { label: 'Happy Clients', current: 0, target: 3 },
        { label: 'Cups of Coffee', current: 0, target: 3 },
        { label: 'Commits', current: 0, target: 3 }
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
      // Animate metrics when section is visible
      const section = this.$refs.metricsSection;
      if (section) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateCounters();
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        io.observe(section);
      }
    });
  },
  methods: {
    tick() {
      let typewriter = this.$refs.typewriter;

      if (!typewriter) {
        return;
      }

      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
      typewriter.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(() => {
        that.tick();
      }, delta);
    },
    animateCounters() {
      const duration = 1300;
      const start = performance.now();
      const startValues = this.metrics.map(m => m.current);
      const deltas = this.metrics.map(m => m.target - m.current);
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = this.easeOutCubic(t);
        this.metrics = this.metrics.map((m, i) => ({
          ...m,
          current: Math.round(startValues[i] + deltas[i] * eased)
        }));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.typewrite>.wrap {
  border-right: 0.08em solid #fff;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg)
  }

  10% {
    transform: rotate(14deg)
  }

  20% {
    transform: rotate(-8deg)
  }

  30% {
    transform: rotate(14deg)
  }

  40% {
    transform: rotate(-4deg)
  }

  50% {
    transform: rotate(10deg)
  }

  60% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(0deg)
  }
}

.pict {
  box-shadow: 0px 0px 73px -9px rgba(255,219,112,0.44);
-webkit-box-shadow: 0px 0px 73px -9px rgba(255,219,112,0.44);
-moz-box-shadow: 0px 0px 73px -9px rgba(255,219,112,0.44);
}

.fadein-up {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 500ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fade-in-from-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
  animation-delay: 500ms;
}

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

.fadein-right {
  opacity: 0;
  animation: fadeInRight 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s forwards;
}

@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadein-1 {
  animation-delay: 200ms;
}
.fadein-2 {
  animation-delay: 400ms;
}
.fadein-3 {
  animation-delay: 600ms;
}
.fade-500 {
  animation-delay: 500ms;
}

.animated-border {
  border-color: #fbbf24;
  animation: borderColorChange 8s linear infinite;
}

@keyframes borderColorChange {
  0% {
    border-color: #fbbf24; /* amber-200 */
  }
  25% {
    border-color: #60a5fa; /* blue-400 */
  }
  50% {
    border-color: #4ade80; /* green-400 */
  }
  75% {
    border-color: #f472b6; /* pink-400 */
  }
  100% {
    border-color: #fbbf24; /* kembali ke amber-200 */
  }
}

.retro-font {
  font-family: 'Press Start 2P', cursive;
}

/* Music-synced pulse (uses global CSS var --beat set by AudioPlayer analyser) */
:root { --beat: 0; }

.beat-scale {
  will-change: transform, filter;
  transition: transform 80ms linear, filter 160ms ease;
  transform: scale(calc(1 + (var(--beat) * 0.12)));
  filter: brightness(calc(1 + (var(--beat) * 0.35)));
}

.beat-glow {
  will-change: box-shadow, transform;
  transition: box-shadow 100ms linear, transform 100ms linear;
  box-shadow:
    0 0 calc(12px + var(--beat) * 48px) rgba(255, 215, 0, calc(0.35 + var(--beat) * 0.55)),
    0 0 calc(6px + var(--beat) * 24px) rgba(34, 197, 94, calc(0.14 + var(--beat) * 0.35));
  transform: translateZ(0) scale(calc(1 + var(--beat) * 0.08));
}
</style>
