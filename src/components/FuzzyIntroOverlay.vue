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
            :base-intensity="0.22"
            :hover-intensity="0.40"
            :thickness="1.9"
          />
          <FuzzyText
            v-if="tagline"
            :text="tagline"
            :font-size="taglineSize"
            :font-weight="700"
            :color="taglineColor"
            :enable-hover="false"
            :base-intensity="0.14"
            :hover-intensity="0.32"
            :thickness="1.4"
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
    taglineColor: { type: String, default: '#ef4444' }
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
    radial-gradient(40% 20% at 20% 40%, rgba(239,68,68,.28), transparent 60%),
    radial-gradient(40% 20% at 80% 60%, rgba(185,28,28,.25), transparent 60%),
    conic-gradient(from 0deg, rgba(239,68,68,.22), rgba(220,38,38,.2), rgba(185,28,28,.2), rgba(153,27,27,.2), rgba(239,68,68,.22));
  filter: blur(38px) saturate(115%);
  mask: radial-gradient(circle at 50% 50%, rgba(0,0,0,.95), transparent 62%);
  -webkit-mask: radial-gradient(circle at 50% 50%, rgba(0,0,0,.95), transparent 62%);
  animation: glow 6.5s ease-in-out infinite;
  opacity: .75;
}

@keyframes glow {
  0%   { transform: rotate(0deg) scale(1); opacity: .72 }
  50%  { transform: rotate(180deg) scale(1.01); opacity: .86 }
  100% { transform: rotate(360deg) scale(1); opacity: .72 }
}

.fio-fade-enter-active, .fio-fade-leave-active { transition: opacity .8s ease-out; }
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
  animation: scanMove 3.4s ease-in-out infinite;
}
@keyframes scanMove {
  0% { transform: translateY(-8%) }
  50% { transform: translateY(8%) }
  100% { transform: translateY(-8%) }
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
.fio-center { animation: pulseIn 1s cubic-bezier(.2,.8,.2,1) 60ms both; }
@keyframes pulseIn { 0% { transform: scale(.985); opacity: .82 } 100% { transform: scale(1); opacity: 1 } }

/* Shine sweep & red pulse without extra DOM */
.fio-center::before {
  content: '';
  position: absolute;
  top: -40%; left: -20%; right: -20%; bottom: -40%;
  background: linear-gradient(120deg, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%);
  transform: translateX(-120%) rotate(8deg);
  animation: shineSweep 2.8s ease-in-out 300ms forwards;
  pointer-events: none;
}
.fio-center::after {
  content: '';
  position: absolute;
  inset: -20%;
  background: radial-gradient(40% 40% at 50% 50%, rgba(239,68,68,0.12), transparent 60%);
  filter: blur(20px) saturate(110%);
  animation: redPulse 2.2s ease-in-out 0s 1;
  pointer-events: none;
}
@keyframes shineSweep {
  0% { transform: translateX(-120%) rotate(8deg); opacity: .0 }
  40% { opacity: .35 }
  100% { transform: translateX(120%) rotate(8deg); opacity: 0 }
}
@keyframes redPulse {
  0%, 100% { opacity: .0; transform: scale(1) }
  50% { opacity: .5; transform: scale(1.02) }
}
</style>
