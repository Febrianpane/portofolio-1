<template>
  <transition name="fio-fade" @after-leave="$emit('done')">
    <div v-if="visible" class="fio-wrap" role="dialog" aria-label="Intro" @click.stop>
      <!-- Overlay FX layers -->
      <div class="fio-scan" aria-hidden="true"></div>
      <div class="fio-grain" aria-hidden="true"></div>
      <div class="fio-vignette" aria-hidden="true"></div>
      <div class="fio-center">
        <div class="fio-stack">
          <FuzzyText
            :text="title"
            :font-size="titleSize"
            :font-weight="900"
            :color="titleColor"
            :enable-hover="false"
            :base-intensity="0.24"
            :hover-intensity="0.5"
            :thickness="1.75"
          />
          <FuzzyText
            v-if="tagline"
            :text="tagline"
            :font-size="taglineSize"
            :font-weight="700"
            :color="taglineColor"
            :enable-hover="false"
            :base-intensity="0.14"
            :hover-intensity="0.35"
            :thickness="1.35"
          />
        </div>
        <div class="fio-neon"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted, defineComponent } from 'vue'
import FuzzyText from '@/components/FuzzyText.vue'

export default defineComponent({
  name: 'FuzzyIntroOverlay',
  components: { FuzzyText },
  emits: ['done'],
  props: {
    title: { type: String, default: 'Febrian Pane' },
    tagline: { type: String, default: 'Frontend Developer • UI/UX' },
    durationMs: { type: Number, default: 2600 },
    titleSize: { type: [Number, String], default: 'clamp(2.4rem, 9vw, 6rem)' },
    taglineSize: { type: [Number, String], default: 'clamp(1rem, 3.6vw, 1.6rem)' },
    titleColor: { type: String, default: '#ffffff' },
    taglineColor: { type: String, default: '#ffdb70' }
  },
  setup(props) {
    const visible = ref(true)
    let timer = 0

    onMounted(() => {
      // Block scroll and clicks behind overlay
      try { document.documentElement.style.overflow = 'hidden' } catch (e) { /* keep default overflow if not accessible */ }
      timer = window.setTimeout(() => {
        visible.value = false
      }, props.durationMs)
    })

    onUnmounted(() => {
      if (timer) window.clearTimeout(timer)
      // Restore scroll
      try { document.documentElement.style.overflow = '' } catch (e) { /* noop */ }
    })

    return { visible }
  }
})
</script>

<style scoped>
.fio-wrap {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  /* Block all interactions behind */
  pointer-events: all;
  background: #000000;
}
:deep(html.dark) .fio-wrap { background: #000000; }

.fio-center { position: relative; padding: 8px 12px; }
.fio-stack { display: grid; gap: 10px; place-items: center; }

/* Neon ring halo */
.fio-neon {
  position: absolute;
  inset: -30% -15%;
  pointer-events: none;
  background:
    radial-gradient(40% 20% at 20% 40%, rgba(255,219,112,.25), transparent 60%),
    radial-gradient(40% 20% at 80% 60%, rgba(96,165,250,.25), transparent 60%),
    conic-gradient(from 0deg, rgba(255,219,112,.18), rgba(247,131,172,.18), rgba(114,239,221,.18), rgba(96,165,250,.18), rgba(255,219,112,.18));
  filter: blur(36px) saturate(120%);
  mask: radial-gradient(circle at 50% 50%, rgba(0,0,0,.95), transparent 62%);
  -webkit-mask: radial-gradient(circle at 50% 50%, rgba(0,0,0,.95), transparent 62%);
  animation: glow 6s ease-in-out infinite;
  opacity: .9;
}

@keyframes glow {
  0%   { transform: rotate(0deg) scale(1); opacity: .85 }
  50%  { transform: rotate(180deg) scale(1.02); opacity: 1 }
  100% { transform: rotate(360deg) scale(1); opacity: .85 }
}

.fio-fade-enter-active, .fio-fade-leave-active { transition: opacity .5s ease; }
.fio-fade-enter-from, .fio-fade-leave-to { opacity: 0; }

/* Extra FX layers */
.fio-scan {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.035),
    rgba(255,255,255,0.035) 2px,
    rgba(0,0,0,0.0) 2px,
    rgba(0,0,0,0.0) 4px
  );
  mix-blend-mode: overlay;
  animation: scanMove 2.4s linear infinite;
}
@keyframes scanMove {
  0% { transform: translateY(-10%) }
  100% { transform: translateY(10%) }
}

.fio-grain {
  position: absolute; inset: -10%; pointer-events: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.05"/></svg>');
  background-size: 220px 220px;
  animation: grainShift 1.8s steps(2) infinite;
}
@keyframes grainShift {
  0% { transform: translate(0,0) }
  25% { transform: translate(1%, -1%) }
  50% { transform: translate(-1%, 1%) }
  75% { transform: translate(1%, 1%) }
  100% { transform: translate(0,0) }
}

.fio-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%);
}

/* Subtle zoom pulse for center */
.fio-center { animation: pulseIn .8s cubic-bezier(.2,.75,.2,1) 60ms both; }
@keyframes pulseIn { 0% { transform: scale(.98); opacity: .85 } 100% { transform: scale(1); opacity: 1 } }
</style>
