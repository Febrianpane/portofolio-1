<script>
import SectionHeader from '@/components/SectionHeader.vue'
export default {
  components: { SectionHeader },
  data() {
    return {
      // About page has no modal or skills now
    };
  },
  mounted() {
    // IntersectionObserver to trigger reveal animations when in view
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    // In Vue 3 with fragment root, this.$el can be a comment node.
    // Query globally instead of relying on this.$el
    const els = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-scale');
    els.forEach((el) => io.observe(el));

  },
  methods: {}
};
</script>
<template>
  <div
    class="relative overflow-hidden backdrop-blur-sm px-4 sm:px-8 lg:px-10 py-6 md:py-12 text-left border rounded-3xl mx-3 mb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)] bg-white/70 dark:bg-[#1e1e1f]/60 border-black/10 dark:border-white/10">
    <!-- decorative animated glow -->
    <div aria-hidden="true" class="pointer-events-none absolute -top-20 -left-24 w-56 h-56 rounded-full bg-amber-300/10 blur-3xl animate-float"></div>
    <div aria-hidden="true" class="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-cyan-300/10 blur-3xl animate-float-delay"></div>
    <article data-page="about">
      <header>
        <SectionHeader title="About Me" subtitle="A brief introduction and what I love to do." align="left" />
      </header>
      
      <section
        class="text-sm md:text-base flex flex-col gap-5 md:flex-row md:gap-10 md:items-center"
      >
        <div class="flex justify-center md:justify-start md:w-5/12 reveal reveal-scale">
          <img
            class="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover border border-white/10 shadow-xl ring-4 ring-amber-300/10 transition-transform duration-300 hover:scale-[1.03] animate-ring-soft"
            src="https://media.licdn.com/dms/image/v2/D4E03AQFT-AmAqVtJ5A/profile-displayphoto-shrink_200_200/B4EZQL6XyoHsAY-/0/1735366641355?e=2147483647&v=beta&t=lsNyzyIcJBr730S7sgQ40PRCxw-Qu236eqRQrMriz9U"
            alt="Foto"
          />
        </div>
        <div class="md:w-7/12">
          <p class="mb-4 md:mb-6 leading-relaxed text-gray-300 reveal reveal-up">
            Hi everyone! My name is <span class="text-amber-200 font-semibold">Febrian Pane</span>. I'm a web developer who enjoys crafting delightful user experiences. For me, building software is not only a profession but also an art with aesthetic values.
          </p>
          <p class="leading-relaxed text-gray-300 reveal reveal-up" style="animation-delay: 120ms">
            My job is to build modern, functional, and user-friendly websites with a personal touch. I aim to convey your message and identity in the most creative way possible. If you're interested in working together, feel free to reach out!
          </p>
        </div>
      </section>
    </article>
  </div>

  

  <!-- Quick Facts section -->
  <div class="px-4 sm:px-8 lg:px-10 mt-6 md:mt-10">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <div class="glass-card glass-card-hover p-4 flex items-center gap-3 reveal reveal-scale" style="animation-delay: 40ms">
        <div class="w-10 h-10 rounded-lg bg-amber-300/15 text-amber-200 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l4 8 8 1-6 6 1 9-7-4-7 4 1-9-6-6 8-1 4-8z"/></svg>
        </div>
        <div>
          <div class="font-semibold text-slate-900 dark:text-white">3+ Years</div>
          <div class="text-xs text-slate-700 dark:text-gray-400">Building Interfaces</div>
        </div>
      </div>
      <div class="glass-card glass-card-hover p-4 flex items-center gap-3 reveal reveal-scale" style="animation-delay: 120ms">
        <div class="w-10 h-10 rounded-lg bg-cyan-300/15 text-cyan-200 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        </div>
        <div>
          <div class="font-semibold text-slate-900 dark:text-white">Stack</div>
          <div class="text-xs text-slate-700 dark:text-gray-400">Vue, Tailwind, Node</div>
        </div>
      </div>
      <div class="glass-card glass-card-hover p-4 flex items-center gap-3 reveal reveal-scale" style="animation-delay: 200ms">
        <div class="w-10 h-10 rounded-lg bg-emerald-300/15 text-emerald-200 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div>
          <div class="font-semibold text-slate-900 dark:text-white">Passion</div>
          <div class="text-xs text-slate-700 dark:text-gray-400">UX & Performance</div>
        </div>
      </div>
      <div class="glass-card glass-card-hover p-4 flex items-center gap-3 reveal reveal-scale" style="animation-delay: 280ms">
        <div class="w-10 h-10 rounded-lg bg-fuchsia-300/15 text-fuchsia-200 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 17h2v2h-2zm0-14h2v12h-2z"/></svg>
        </div>
        <div>
          <div class="font-semibold text-slate-900 dark:text-white">Open to Work</div>
          <div class="text-xs text-slate-700 dark:text-gray-400">Freelance & Remote</div>
        </div>
      </div>
    </div>
  </div>

  
  
  
  </template>

<style>
.fadein-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeins-1 {
  animation-delay: 500ms;
}

.fadeins-2 {
  animation-delay: 800ms;
}

/* Reveal on mount with slight stagger */
.reveal-up {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 600ms ease forwards;
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* cleaned unused skills/certificates and modal styles */
</style>
