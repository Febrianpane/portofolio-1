<script>
import SectionHeader from '@/components/SectionHeader.vue'
export default {
  components: { SectionHeader },
  data() {
    return {
      // Profile card data
      profileData: {
        avatarUrl: '/profile1.png'
      },
      // Dummy data to render Certificates UI without local files
      certs: [
        { id: 1, title: 'Responsive Web Design', issuer: 'Coursera', year: '2024', url: '#', logo: 'https://picsum.photos/seed/coursera/64/64', image: 'https://picsum.photos/id/1015/800/480' },
        { id: 2, title: 'Foundations of UI/UX', issuer: 'Google', year: '2024', url: '#', logo: 'https://picsum.photos/seed/google/64/64', image: 'https://picsum.photos/id/1016/800/480' },
        { id: 3, title: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2023', url: '#', logo: 'https://picsum.photos/seed/fcc/64/64', image: 'https://picsum.photos/id/1025/800/480' },
      ],
      // Tilt effect
      isHovered: false,
      mouseX: 0,
      mouseY: 0
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

    const els = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-scale');
    els.forEach((el) => io.observe(el));
  },
  methods: {
    handleContactClick() {
      window.open('https://id.linkedin.com/in/febrian-sitorus', '_blank');
    },
    handleMouseMove(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    },
    handleMouseEnter() {
      this.isHovered = true;
    },
    handleMouseLeave() {
      this.isHovered = false;
    },
    getCardTransform() {
      if (!this.isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      const card = this.$refs.profileCard;
      if (!card) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (this.mouseX - centerX) / centerX;
      const deltaY = (this.mouseY - centerY) / centerY;
      
      const rotateY = deltaX * 10;
      const rotateX = -deltaY * 10;
      
      return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  }
};
</script>
<template>
  <div class="about-container">

    <!-- About description -->
    <div class="about-description reveal reveal-up">
      <SectionHeader title="About Me" subtitle="A brief introduction and what I love to do." align="left" />
      <div class="about-row">
        <!-- Card (left) -->
        <div 
          ref="profileCard"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @mousemove="handleMouseMove"
        >
          <div 
          class="profile-card"
          :style="{ transform: getCardTransform() }"
          >
            <img class="card-photo-bg" :src="profileData.avatarUrl" alt="" aria-hidden="true" />
            <div class="grain-overlay"></div>
            <div class="behind-gradient"></div>
            <div class="icon-pattern"></div>
            <div class="card-content">
              <div class="user-info">
                <p class="user-title">{{ profileData.title }}</p>
              </div>
            </div>
          <div class="shine-effect" v-if="isHovered"></div>
          </div>
        </div>
        <!-- Text (right) -->
        <div class="description-content">
          <p class="description-text shiny-text">
            Hi everyone! My name is <span class="highlight">Febrian Sitorus</span>. I'm a web developer who enjoys crafting delightful user experiences. For me, building software is not only a profession but also an art with aesthetic values.
          </p>
          <p class="description-text shiny-text">
            My job is to build modern, functional, and user-friendly websites with a personal touch. I aim to convey your message and identity in the most creative way possible. If you're interested in working together, feel free to reach out!
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Facts section -->
    <div class="mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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

    <!-- Certificates (own layout) -->
    <section class="mt-10">
    <SectionHeader title="Certificates" subtitle="Proof of skills and achievements" align="left" />
    <!-- Cards grid -->
    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article
        v-for="c in certs"
        :key="c.id"
        class="group rounded-xl border border-white/10 bg-white/60 dark:bg-[#1e1e1f]/60 p-4 hover:shadow-lg transition backdrop-blur-sm cert-card"
      >
        <div class="flex items-start gap-3">
          <img :src="c.logo" :alt="c.issuer" class="w-9 h-9 object-contain opacity-90" />
          <div>
            <h3 class="text-slate-900 dark:text-white font-semibold leading-tight">{{ c.title }}</h3>
            <p class="text-xs text-slate-700 dark:text-gray-400">{{ c.issuer }} • {{ c.year }}</p>
          </div>
        </div>
        <div class="mt-3 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
          <img :src="c.image" :alt="c.title" class="w-full h-40 object-cover" />
        </div>
        <div class="mt-3 flex justify-between items-center">
          <a :href="c.url" target="_blank" rel="noopener" class="text-red-400 dark:text-red-300 text-sm hover:underline">View credential</a>
        </div>
      </article>
    </div>

    <!-- Spacer for bottom breathing room -->
    <div class="mt-8 h-8 md:h-12"></div>
    </section>
  </div>
</template>

<style scoped>
/* Container */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Profile Card Wrapper */
.profile-card-wrapper {
  perspective: 1000px;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}

/* Profile Card */
.profile-card {
  position: relative;
  width: 100%;
  max-width: 600px; /* enlarged card */
  aspect-ratio: 3/4;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.profile-card:hover {
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 0 40px rgba(59, 130, 246, 0.3);
}

/* Background photo element inside card */
.card-photo-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%; /* keep face in upper third */
  transform: none;          /* fill card fully */
  transform-origin: 50% 50%;
  filter: brightness(0.82) contrast(1.05);
  z-index: 0;
}

/* Grain Overlay */
.grain-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Behind Gradient */
.behind-gradient {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  animation: gradientShift 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(10px, 10px) rotate(5deg); }
}

/* Icon Pattern */
.icon-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  pointer-events: none;
}

/* Card Content */
.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 2rem;
  z-index: 1;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: avatarGlow 3s ease-in-out infinite;
  filter: blur(20px);
}

@keyframes avatarGlow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.avatar-image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(59, 130, 246, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.avatar-ring {
  position: absolute;
  inset: -8px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: ringRotate 4s linear infinite;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.status-online {
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.status-text {
  font-size: 0.875rem;
  color: #e2e8f0;
  font-weight: 500;
}

/* User Info */
.user-info {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.user-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.user-title {
  font-size: 1rem;
  color: #94a3b8;
  margin: 0;
}

.user-handle {
  font-size: 0.875rem;
  color: #3b82f6;
  margin: 0;
  font-weight: 500;
}

/* Contact Button */
.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  position: relative;
  overflow: hidden;
}

.contact-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-button:hover::before {
  opacity: 1;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
}

.contact-button:active {
  transform: translateY(0);
}

.button-text,
.button-icon {
  position: relative;
  z-index: 1;
}

.button-icon {
  transition: transform 0.3s ease;
}

.contact-button:hover .button-icon {
  transform: translateX(4px);
}

/* Decorative Dots */
.decorative-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.5);
  animation: dotPulse 2s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* Shine Effect */
.shine-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: shine 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
}

/* About Description */
.about-description {
  max-width: 1200px; /* widen section left-right */
  margin: 0 auto;
  padding: 2rem 2.5rem; /* add a bit more horizontal padding */
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
}

/* Row layout: card left, text right */
.about-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: start;
}

@media (min-width: 900px) {
  .about-row {
    grid-template-columns: 240px 2fr; /* larger photo card left, flexible text right */
    gap: 2rem;
  }
  .about-description .profile-card-wrapper { justify-content: start; }
  .about-description .profile-card { max-width: 100%; }
  .about-description .description-content { margin-top: 0; }
  .avatar-wrapper { width: 180px; height: 180px; }
}

.description-content {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description-text {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 1rem;
}

/* Shiny Text Effect */
.shiny-text {
  position: relative;
  background: linear-gradient(90deg,
    rgba(203,213,225,0.78) 0%,
    rgba(255,255,255,0.96) 16%,
    rgba(203,213,225,0.78) 32%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: shineText 4.8s ease-in-out infinite;
  will-change: background-position;
  text-shadow: 0 0 6px rgba(255,255,255,0.05);
}

@keyframes shineText {
  0% { background-position: -200% 0; }
  50% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .shiny-text {
    animation: none;
    background-position: 0 0;
  }
}

.highlight {
  color: #fbbf24;
  font-weight: 600;
}

/* Reveal Animations */
.reveal {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.in-view {
  opacity: 1;
}

.reveal-scale {
  transform: scale(0.95);
}

.reveal-scale.in-view {
  transform: scale(1);
}

.reveal-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 600ms ease forwards;
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .profile-card {
    max-width: 420px; /* larger on mobile too */
  }
  
  .avatar-wrapper {
    width: 140px;
    height: 140px;
  }
  
  .user-name {
    font-size: 1.5rem;
  }
  
  .card-content {
    padding: 2rem 1.5rem;
  }
}

/* Certificates — Game Skull Theme */
.cert-card {
  position: relative;
  overflow: hidden;
  background: rgba(18, 18, 19, 0.7);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
  will-change: transform, box-shadow;
}
.cert-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  background: conic-gradient(
    from 0deg,
    #7f1d1d,
    #991b1b,
    #dc2626,
    #ef4444,
    #b91c1c,
    #7f1d1d
  );
  padding: 1px;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: .8;
  filter: blur(10px);
  z-index: 0;
  pointer-events: none;
  animation: cert-border-move 6s linear infinite;
}
.cert-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.03) 0 2px,
    transparent 2px 6px
  );
  mix-blend-mode: overlay;
  opacity: .18;
  pointer-events: none;
  z-index: 0;
}
.cert-card:hover {
  transform: translateY(-4px);
  border-color: rgba(239,68,68,0.4);
  box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 28px rgba(239,68,68,0.28);
}
.cert-card:hover::before { opacity: .95; filter: blur(8px); }

/* Image wrapper and image motion */
.cert-card .rounded-lg {
  position: relative;
  border: 1px solid rgba(255,255,255,0.06);
  background:
    radial-gradient(circle at 30% 30%, rgba(239,68,68,0.12), transparent 55%),
    radial-gradient(circle at 70% 70%, rgba(185,28,28,0.12), transparent 55%);
}
.cert-card img {
  transition: transform .45s cubic-bezier(.22,1,.36,1), filter .3s ease;
}
.cert-card:hover img { transform: scale(1.04); }

/* Title subtle glow */
.cert-card h3 { text-shadow: 0 1px 10px rgba(239,68,68,0.18); }
.cert-card a { text-shadow: 0 0 8px rgba(239,68,68,0.35); }

@keyframes cert-border-move {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
