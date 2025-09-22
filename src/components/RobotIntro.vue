<template>
  <transition name="intro-fade" appear>
    <section
      v-if="visible"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0f14] text-white overflow-hidden"
      @click="finish"
    >
      <!-- Starfield background -->
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="stars stars-1"></div>
        <div class="stars stars-2"></div>
        <div class="stars stars-3"></div>
      </div>

      <!-- Content wrapper (Robot only) -->
      <div class="relative mx-4 w-full flex items-center justify-center">
        <!-- Robot -->
        <div class="flex items-center justify-center">
          <div class="relative robot-size">
            <!-- Glow -->
            <div class="absolute -inset-8 blur-3xl bg-gradient-to-tr from-cyan-500/20 via-amber-300/10 to-fuchsia-500/10 rounded-full"></div>

            <!-- Robot SVG -->
            <svg
              class="relative w-full h-auto drop-shadow-[0_10px_30px_rgba(0,255,255,0.15)] animate-float"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Animated friendly robot"
            >
              <!-- Body -->
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#0ea5e9"/>
                  <stop offset="100%" stop-color="#22d3ee"/>
                </linearGradient>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#111827"/>
                  <stop offset="100%" stop-color="#0b1220"/>
                </linearGradient>
              </defs>

              <!-- Antenna -->
              <line x1="200" y1="35" x2="200" y2="70" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
              <circle cx="200" cy="28" r="10" fill="#fbbf24" class="antenna-glow" />

              <!-- Head -->
              <rect x="120" y="70" rx="24" ry="24" width="160" height="120" fill="url(#bodyGrad)" />
              <rect x="135" y="90" rx="16" ry="16" width="130" height="80" fill="url(#screenGrad)" />

              <!-- Eyes -->
              <g class="eyes">
                <circle cx="170" cy="130" r="12" fill="#22d3ee" />
                <circle cx="230" cy="130" r="12" fill="#22d3ee" />
                <rect x="158" y="122" width="24" height="16" fill="#0b1220" class="blink" />
                <rect x="218" y="122" width="24" height="16" fill="#0b1220" class="blink" />
              </g>

              <!-- Mouth / Wave -->
              <path d="M155 160 Q 200 190 245 160" stroke="#34d399" stroke-width="6" stroke-linecap="round" fill="none" class="talk" />

              <!-- Torso -->
              <g class="body-bob">
                <rect x="140" y="200" rx="22" ry="22" width="120" height="110" fill="url(#bodyGrad)" />

                <!-- Screen lines -->
                <g stroke="#0ea5e9" stroke-width="4" stroke-linecap="round" opacity="0.6">
                  <line x1="160" y1="220" x2="240" y2="220" />
                  <line x1="160" y1="240" x2="240" y2="240" />
                  <line x1="160" y1="260" x2="240" y2="260" />
                </g>
              </g>

              <!-- Arms -->
              <g stroke="#67e8f9" stroke-width="10" stroke-linecap="round">
                <!-- Left arm: gentle swing like walking -->
                <path d="M140 220 Q 110 240 100 270" class="arm-left" />
                <!-- Right arm: raised and waving above head -->
                <g class="wave-group">
                  <!-- Right arm raised above head -->
                  <path d="M260 220 Q 300 200 320 170" class="arm-right-static" />
                </g>
              </g>

              <!-- Hands -->
              <circle cx="96" cy="276" r="12" fill="#fbbf24" class="hand-left" />
              <!-- Right hand grouped to follow waving -->
              <g class="wave-group">
                <circle cx="322" cy="168" r="12" fill="#fbbf24" class="hand-right" />
              </g>

              <!-- Legs (walking in place) -->
              <g stroke="#67e8f9" stroke-width="12" stroke-linecap="round">
                <g class="leg-left">
                  <line x1="175" y1="310" x2="175" y2="350" />
                </g>
                <g class="leg-right">
                  <line x1="225" y1="310" x2="225" y2="350" />
                </g>
              </g>

              <!-- Shadow -->
              <ellipse cx="200" cy="360" rx="90" ry="14" fill="rgba(0,0,0,.35)" class="shadow-step" />

              <!-- Hello bubble -->
              <g class="hello-bubble">
                <rect x="245" y="75" rx="10" ry="10" width="70" height="34" fill="#0b1220" stroke="#22d3ee" stroke-width="2" />
                <text x="280" y="97" text-anchor="middle" font-size="14" fill="#a5f3fc" font-family="'Poppins', sans-serif">Hello!</text>
                <path d="M250 112 L240 118 L244 106 Z" fill="#0b1220" stroke="#22d3ee" stroke-width="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <audio ref="beep" preload="auto">
        <source :src="beepSrc" type="audio/mpeg" />
      </audio>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'RobotIntro',
  emits: ['finished'],
  data() {
    return {
      visible: true,
      soundOn: false,
      timer: null,
      beepSrc: 'data:audio/mpeg;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAA...' // short silent placeholder
    }
  },
  mounted() {
    // Auto close after 3.2s
    this.timer = setTimeout(this.finish, 3200)
    // Play a tiny beep if enabled
    this.$nextTick(() => {
      if (this.soundOn && this.$refs.beep) {
        this.$refs.beep.currentTime = 0
        this.$refs.beep.play().catch(() => {})
      }
    })
  },
  beforeUnmount() {
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    finish() {
      this.visible = false
      this.$emit('finished')
    },
    toggleSound() {
      this.soundOn = !this.soundOn
      if (this.soundOn && this.$refs.beep) {
        this.$refs.beep.currentTime = 0
        this.$refs.beep.play().catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
/***** Transition *****/
.intro-fade-enter-active, .intro-fade-leave-active { transition: opacity .5s ease, transform .5s ease; }
.intro-fade-enter-from, .intro-fade-leave-to { opacity: 0; transform: scale(.98); }

/***** Stars background *****/
.stars { position: absolute; inset: 0; background-repeat: repeat; }
.stars-1 { background-image: radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,.6) 50%, transparent 50%),
                         radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,.35) 50%, transparent 50%),
                         radial-gradient(1px 1px at 220px 120px, rgba(255,255,255,.4) 50%, transparent 50%);
          background-size: 200px 200px; animation: starMove1 30s linear infinite; }
.stars-2 { background-image: radial-gradient(2px 2px at 70px 60px, rgba(255,255,255,.5) 50%, transparent 50%),
                         radial-gradient(1px 1px at 10px 140px, rgba(255,255,255,.3) 50%, transparent 50%),
                         radial-gradient(1px 1px at 160px 180px, rgba(255,255,255,.35) 50%, transparent 50%);
          background-size: 250px 250px; animation: starMove2 45s linear infinite; opacity:.8; }
.stars-3 { background-image: radial-gradient(2px 2px at 120px 20px, rgba(255,255,255,.45) 50%, transparent 50%),
                         radial-gradient(1px 1px at 200px 150px, rgba(255,255,255,.25) 50%, transparent 50%),
                         radial-gradient(1px 1px at 80px 190px, rgba(255,255,255,.3) 50%, transparent 50%);
          background-size: 300px 300px; animation: starMove3 60s linear infinite; opacity:.6; }

@keyframes starMove1 { from { background-position: 0 0; } to { background-position: -2000px 0; } }
@keyframes starMove2 { from { background-position: 0 0; } to { background-position: 2000px 0; } }
@keyframes starMove3 { from { background-position: 0 0; } to { background-position: 0 2000px; } }

/***** Robot animations *****/
.animate-float { animation: float 4.5s ease-in-out infinite; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.antenna-glow { filter: drop-shadow(0 0 6px rgba(251,191,36,.8)); animation: glow 1.6s ease-in-out infinite; }
@keyframes glow { 0%,100% { opacity:.9; } 50% { opacity:.4; } }

.eyes .blink { animation: blink 4s infinite; transform-origin: center; }
@keyframes blink { 0%, 47%, 49%, 100% { transform: scaleY(0); } 48% { transform: scaleY(1); } }

.talk { stroke-dasharray: 140; stroke-dashoffset: 140; animation: talk 3s ease forwards 400ms; }
@keyframes talk { to { stroke-dashoffset: 0; } }

.arm-left { animation: wave-left 2.2s ease-in-out infinite; }
.arm-right { animation: wave-right 2.2s ease-in-out infinite; }
.hand-left { animation: hand-left 2.2s ease-in-out infinite; transform-origin: 100px 270px; }
/* Right hand will follow the waving group; disable its standalone rotation */
.hand-right { animation: none; transform-origin: 300px 270px; }

/* Wave group: rotate around shoulder (260,220) to wave above head */
.wave-group { transform-origin: 260px 220px; animation: waveHello 1.8s ease-in-out infinite; }
@keyframes waveHello { 0% { transform: rotate(-20deg); } 25% { transform: rotate(-55deg); } 50% { transform: rotate(-20deg); } 75% { transform: rotate(-58deg); } 100% { transform: rotate(-20deg); } }

@keyframes wave-left { 0%,100% { d: path('M140 220 Q 110 240 100 270'); } 50% { d: path('M140 220 Q 105 230 95 255'); } }
@keyframes wave-right { 0%,100% { d: path('M260 220 Q 290 240 300 270'); } 50% { d: path('M260 220 Q 295 230 305 255'); } }
@keyframes hand-left { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-12deg); } }
@keyframes hand-right { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(12deg); } }

/***** Typing effect *****/
.typing { position: relative; display: inline-block; padding-right: .6rem; }
.typing:after { content: ''; position: absolute; right: 0; top: 0; height: 100%; width: 2px; background: #a5f3fc; animation: caret 1s steps(1) infinite; }
@keyframes caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

/* Responsive robot size */
.robot-size { width: clamp(220px, 35vw, 440px); }

/* Walking + hello enhancements */
.body-bob { animation: bodyBob 0.8s ease-in-out infinite; }
@keyframes bodyBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(2px); } }

.leg-left { transform-origin: 175px 310px; animation: legLeft 0.8s ease-in-out infinite; }
.leg-right { transform-origin: 225px 310px; animation: legRight 0.8s ease-in-out infinite; animation-delay: 0.4s; }
@keyframes legLeft { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(-6deg); } }
@keyframes legRight { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }

.shadow-step { animation: shadowPulse 0.8s ease-in-out infinite; transform-origin: 200px 360px; }
@keyframes shadowPulse { 0%,100% { transform: scaleX(1); opacity: .35; } 50% { transform: scaleX(0.9); opacity: .5; } }

.hello-bubble { opacity: 0; animation: helloPop 2.2s ease forwards 600ms; transform-origin: 245px 75px; }
@keyframes helloPop { 0% { opacity: 0; transform: translateY(8px) scale(.85); } 15% { opacity: 1; transform: translateY(0) scale(1); } 75% { opacity: 1; } 100% { opacity: 0; } }
</style>
