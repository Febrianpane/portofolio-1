<template>
  <div
    class="fixed bottom-4 left-4 z-[130] select-none"
    role="region"
    aria-label="Audio player"
  >
    <!-- Play / Pause only (styled like social buttons) -->
    <button
      :class="[
        'inline-flex items-center justify-center w-8 h-8 rounded-full text-white shadow transition focus:outline-none',
        isPlaying
          ? 'bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 ring-2 ring-amber-300/40 animate-pulse'
          : 'bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 hover:brightness-110 ring-2 ring-white/20'
      ]"
      :aria-label="isPlaying ? 'Pause' : 'Play'"
      @click="togglePlay"
    >
      <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
        <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
      </svg>
    </button>

    <!-- Hidden audio element -->
    <audio ref="audio" :src="resolvedSrc" preload="none" />
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: { type: String, default: '' },
    title: { type: String, default: 'Background Music' },
  },
  data() {
    return {
      isPlaying: false,
      interacted: false,
      audioCtx: null,
      analyser: null,
      source: null,
      rafId: 0,
      levelSmooth: 0,
    }
  },
  computed: {
    resolvedSrc() {
      // Fallback to a default path if no prop provided. Replace with your track path.
      // Example: place file at public/assets/song.mp3
      return this.src || '/assets/song.mp3'
    }
  },
  mounted() {
    // Any user interaction will allow playback
    const enable = () => { this.interacted = true; window.removeEventListener('click', enable); window.removeEventListener('keydown', enable) }
    window.addEventListener('click', enable, { once: true })
    window.addEventListener('keydown', enable, { once: true })
  },
  beforeUnmount() {
    this.stopAnalyser()
  },
  methods: {
    async togglePlay() {
      const audio = this.$refs.audio
      if (!audio) return
      if (this.isPlaying) {
        audio.pause()
        this.isPlaying = false
        this.stopAnalyser()
      } else {
        try {
          await audio.play()
          this.isPlaying = true
          this.startAnalyser()
        } catch (e) {
          // Likely blocked by autoplay policy; wait for user interaction
          this.isPlaying = false
        }
      }
    },
    startAnalyser() {
      const el = this.$refs.audio
      if (!el) return
      try {
        if (!this.audioCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext
          this.audioCtx = new Ctx()
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume()
        this.analyser = this.analyser || this.audioCtx.createAnalyser()
        this.analyser.fftSize = 512
        this.analyser.smoothingTimeConstant = 0.8
        // recreate source to avoid InvalidStateError
        this.source = this.audioCtx.createMediaElementSource(el)
        this.source.connect(this.analyser)
        this.analyser.connect(this.audioCtx.destination)
        // Notify listeners that analyser is ready
        window.dispatchEvent(new CustomEvent('audio-visualizer-ready', { detail: { analyser: this.analyser, audioCtx: this.audioCtx } }))

        const buf = new Uint8Array(this.analyser.frequencyBinCount)
        const root = document.documentElement
        const loop = () => {
          this.analyser.getByteFrequencyData(buf)
          // emphasize low-mid
          let sum = 0, count = 0
          const maxBin = Math.min(60, buf.length)
          for (let i = 0; i < maxBin; i++) { sum += buf[i]; count++ }
          const avg = count ? sum / (count * 255) : 0
          const attack = 0.35, release = 0.08
          if (avg > this.levelSmooth) {
            this.levelSmooth += (avg - this.levelSmooth) * attack
          } else {
            this.levelSmooth += (avg - this.levelSmooth) * release
          }
          const level = Math.max(0, Math.min(1, this.levelSmooth * 1.9))
          root.style.setProperty('--beat', level.toFixed(3))
          if (this.isPlaying) this.rafId = requestAnimationFrame(loop)
        }
        cancelAnimationFrame(this.rafId)
        this.rafId = requestAnimationFrame(loop)
      } catch (err) {
        console.warn('Analyser init failed:', err)
      }
    },
    stopAnalyser() {
      cancelAnimationFrame(this.rafId)
      this.rafId = 0
      this.levelSmooth = 0
      document.documentElement.style.setProperty('--beat', '0')
      // Notify listeners to stop
      try { window.dispatchEvent(new CustomEvent('audio-visualizer-stop')) } catch (_) { /* noop */ }
      try {
        if (this.source) { this.source.disconnect(); this.source = null }
        if (this.analyser) { this.analyser.disconnect() }
      } catch (_) { void 0 }
    }
  }
}
</script>

<style scoped>
/***** Optional small visual tweaks *****/
</style>
