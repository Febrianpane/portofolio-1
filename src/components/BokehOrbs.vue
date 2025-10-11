<template>
  <div class="bokeh-root" aria-hidden="true">
    <div
      v-for="(o, i) in orbs"
      :key="i"
      class="orb"
      :style="{
        left: o.x + 'vw',
        top: o.y + 'vh',
        width: o.size + 'vmax',
        height: o.size + 'vmax',
        opacity: o.opacity,
        filter: `blur(${o.blur}px)`,
        animationDuration: o.duration + 's',
        animationDelay: o.delay + 's',
        background: `radial-gradient( circle at 35% 35%, ${o.color} 0%, rgba(0,0,0,0) 60% )`,
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'BokehOrbs',
  data() {
    return {
      orbs: [],
      reduce: false,
    }
  },
  mounted() {
    this.reduce = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    this.generate()
    window.addEventListener('resize', this.generate)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.generate)
  },
  methods: {
    rand(min, max) { return Math.random() * (max - min) + min },
    pick(arr) { return arr[Math.floor(Math.random() * arr.length)] },
    generate() {
      const isMobile = window.innerWidth < 640
      // Keep minimal orbs visible even in reduced-motion
      const count = this.reduce ? (isMobile ? 1 : 2) : (isMobile ? 5 : 9)
      const paletteLight = ['#93c5fd', '#fdba74', '#86efac', '#f5d0fe', '#a7f3d0']
      const paletteDark = ['#60a5fa', '#f59e0b', '#34d399', '#a78bfa', '#22d3ee']
      const isDark = document.documentElement.classList.contains('dark')
      const palette = isDark ? paletteDark : paletteLight

      const arr = []
      for (let i = 0; i < count; i++) {
        const size = this.rand(8, 14) // slightly larger for visibility
        arr.push({
          x: this.rand(-10, 90),
          y: this.rand(-10, 90),
          size,
          blur: this.rand(8, 18),
          opacity: this.rand(0.12, 0.22),
          duration: this.rand(28, 46),
          delay: this.rand(-20, 10),
          color: this.pick(palette)
        })
      }
      this.orbs = arr
    }
  }
}
</script>

<style scoped>
.bokeh-root {
  /* Fixed ensures full-viewport coverage regardless of parent layout */
  position: fixed;
  inset: 0;
  z-index: -1; /* above galaxy(-2), below content */
  pointer-events: none;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  transform: translateZ(0);
  will-change: transform, opacity;
  animation-name: floatxy;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes floatxy {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(4vmax, -3vmax, 0) scale(1.04); }
  50% { transform: translate3d(0vmax, 3vmax, 0) scale(0.98); }
  75% { transform: translate3d(-4vmax, -2vmax, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
</style>
