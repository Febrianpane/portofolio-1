<template>
  <main class="relative">
    <!-- Hero Section -->
    <section id="home" class="relative section-container pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 min-h-[70vh] flex items-center">
      <!-- Background decorations -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-10 -left-10 w-56 h-56 bg-amber-300/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        <!-- Left: Text -->
        <div class="text-center md:text-left order-2 md:order-1">
          <p class="text-amber-700 dark:text-amber-200 tracking-wide fade-in-from-left">Hello World, I'm</p>
          <h1 class="mt-2 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white retro-font fadein-up beat-scale">Febrian Pane</h1>
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
            <a href="#portfolio" class="btn-primary font-semibold">
              View Portfolio
            </a>
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
              :gain="0.45"
              :barWidth="2"
              :lengthScale="0.45"
              :bars="72"
              :showInnerRings="true"
              :ringWidth="2"
              ringColor="#A855F7"
              dottedRingColor="#34D399"
              :dashedSegRatio="1.6"
              :dashedGapRatio="0.6"
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

    <!-- Pricing / Packages -->
    <section class="section-container py-16">
      <SectionHeader title="Pricing" subtitle="Choose a package that fits your project" />
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <article
          v-for="plan in pricingPlans"
          :key="plan.id"
          :class="['rounded-xl p-5 glass-card hover-lift glass-card-hover flex flex-col', plan.featured ? 'ring-1 ring-red-500/40' : '']"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-white font-semibold text-lg">{{ plan.title }}</h3>
            <span v-if="plan.featured" class="text-[10px] px-2 py-0.5 rounded-full bg-red-600/30 text-red-200 border border-red-500/40">Recommended</span>
          </div>
          <div class="mt-2 flex items-end gap-1">
            <div class="text-3xl font-extrabold text-amber-300">{{ plan.price }}</div>
            <div class="text-xs text-gray-400 mb-1">/project</div>
          </div>
          <p class="mt-2 text-sm text-gray-300">{{ plan.description }}</p>
          <ul class="mt-4 space-y-2 text-sm flex-1">
            <li v-for="(f, idx) in plan.features" :key="idx" class="flex items-start gap-2">
              <svg class="mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>
              <span class="text-gray-200">{{ f }}</span>
            </li>
          </ul>
          <a :href="whatsAppLink(plan)" target="_blank" rel="noopener" class="mt-5 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-gradient-to-r from-rose-700 via-red-600 to-red-800 text-white hover:brightness-110">
            {{ plan.ctaText }}
          </a>
        </article>
      </div>
    </section>

    <!-- About Section (component) -->
    <section id="about" class="section-container py-16">
      <AboutView />
    </section>

    <!-- Portfolio Section (inline) -->
    <section id="portfolio" class="section-container py-16 text-left">
      <article>
        <header>
          <SectionHeader title="Past Project Experience" subtitle="Explore the projects I've worked on so far" />
        </header>
        <section>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3 2xl:gap-5 fade-zoom-in pb-10">
            <div v-for="item in portfolioItems" :key="item.id">
              <div class="item-card glass-card glass-card-hover hover-lift flex flex-col items-center gap-2 rounded-xl md:gap-3 px-5 py-5 lg:px-5 ">
                <div class="flex items-center justify-center p-0 w-full zoom-in">
                  <img :alt="`Project ${item.name}`" loading="lazy" decoding="async" class="drop-shadow-xl rounded-xl w-full object-cover" :src="'/img/' + item.imageUrl + '.png'">
                </div>
                <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg">
                  <div class="title-text font-medium text-slate-900 dark:text-white">{{ item.name }}</div>
                  <div class="w-full text-left text-[10px] text-slate-700 dark:text-[#c1c1c1] md:text-xs lg:text-sm">{{ item.status }}</div>
                  <div class="w-full mt-4 text-normal text-sm text-left text-amber-700 dark:text-amber-200">{{ item.tech }}</div>
                  <div class="w-full flex justify-end">
                    <div class="flex cursor-pointer items-end gap-3 text-primary">
                      <a v-if="item.github !== 'null'" :href="item.github" target="_blank" rel="noreferrer" title="View github repository" class="transition-all hover:text-amber-300">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                      <a v-if="item.demo !== 'null'" :href="item.demo" target="_blank" rel="noreferrer" title="View finished project" class="transition-all hover:text-amber-300">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </section>

    

    

    

    <!-- Contact Section (embedded, redesigned) -->
    <section id="contact" class="section-container py-16 text-left">
      <div class="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3">
        <!-- Left column: Contact form + Social cards -->
        <div class="lg:col-span-1">
          <div class="rounded-2xl bg-[#1f1f22]/80 border border-white/10 p-5 md:p-6 shadow-xl star-border">
            <div class="flex items-start justify-between">
              <div>
                <h2 data-scroll-target class="text-2xl md:text-3xl font-extrabold text-amber-300">Hubungi</h2>
                <p class="mt-1 text-sm text-gray-300">Ada yang ingin didiskusikan? Kirim pesan dan mari bicara.</p>
              </div>
            </div>

            <form class="mt-6 space-y-4" @submit.prevent="submitContact">
              <!-- Alerts -->
              <div v-if="contactErrors.length" class="rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 text-sm px-3 py-2">
                <ul class="list-disc list-inside">
                  <li v-for="(err, idx) in contactErrors" :key="idx">{{ err }}</li>
                </ul>
              </div>
              <div v-if="contactSuccess" class="rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm px-3 py-2">{{ contactSuccess }}</div>

              <!-- Honeypot (hidden) -->
              <input v-model="contactBotField" type="text" class="hidden" tabindex="-1" autocomplete="off">

              <input v-model="contactName" type="text" placeholder="Nama Anda" class="w-full rounded-xl bg-[#141416]/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" required>
              <input v-model="contactEmail" type="email" placeholder="Email Anda" class="w-full rounded-xl bg-[#141416]/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" required>
              <textarea v-model="contactMessage" rows="4" placeholder="Pesan Anda (min. 10 karakter)" class="w-full rounded-xl bg-[#141416]/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" required></textarea>
              <button type="submit" :disabled="isSending" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold px-4 py-3 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                <span v-if="!isSending">Kirim Pesan</span>
                <span v-else>Mengirim...</span>
              </button>
            </form>
          </div>

          <!-- Connect with me removed -->
        </div>

        <!-- Right column: 
          panel -->
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-[#1f1f22]/80 border border-white/10 p-5 md:p-6 shadow-xl star-border">
            <div class="flex items-center justify-between">
              <h3 class="text-lg md:text-xl font-semibold text-white">Comments <span class="text-violet-400">({{ comments.length }})</span></h3>
            </div>

            <form class="mt-5 space-y-4" @submit.prevent="submitComment">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input v-model="newCommentName" type="text" placeholder="Name *" class="w-full rounded-xl bg-[#141416]/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" required>
                <div class="md:col-span-1">
                  <label class="block text-xs text-gray-400 mb-1">Profile Photo (optional)</label>
                  <label class="flex items-center justify-between gap-3 rounded-xl bg-[#141416]/80 border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-300 hover:border-violet-500 cursor-pointer">
                    <input type="file" accept="image/*" class="hidden" @change="onPhotoChange">
                    <span>{{ newCommentPhotoName || 'Choose Profile Photo' }}</span>
                    <span class="text-xs text-gray-500">Max 5MB</span>
                  </label>
                </div>
              </div>
              <textarea v-model="newCommentMessage" rows="4" placeholder="Write your message here... *" class="w-full rounded-xl bg-[#141416]/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" required></textarea>
              <button type="submit" class="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-700 via-red-600 to-red-800 text-white font-semibold px-4 py-3 hover:brightness-110">Post Comment</button>
            </form>

            <transition-group tag="div" name="comment-list" class="mt-6 space-y-4 max-h-[420px] overflow-auto pr-2">
              <article
                v-for="c in comments"
                :key="c.id"
                :class="['rounded-xl border p-4 comment-card', isNewComment(c.id) ? 'is-new' : '']"
              >
                <div class="flex items-start justify-between min-w-0">
                  <div class="flex items-center gap-3">
                    <img v-if="c.avatarUrl" :src="c.avatarUrl" alt="avatar" class="w-8 h-8 rounded-full object-cover"/>
                    <div v-else class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">{{ c.name.substring(0,1).toUpperCase() }}</div>
                    <div>
                      <div class="text-sm font-medium text-white break-words">{{ c.name }}</div>
                      <div class="text-[11px] text-gray-400">{{ c.date }}</div>
                    </div>
                  </div>
                </div>
                <p class="mt-3 text-sm text-gray-200 break-words whitespace-pre-wrap max-w-full">{{ c.message }}</p>
              </article>
            </transition-group>
          </div>
        </div>
      </div>
    </section>
    
  </main>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import AvatarVisualizer from '@/components/AvatarVisualizer.vue'
import AboutView from './AboutView.vue'
import { supabase } from '@/lib/supabase.js'
import emailjs from 'emailjs-com'
export default {
  name: 'HomeView',
  components: { SectionHeader, AvatarVisualizer, AboutView },
  data() {
    return {
      toRotate: ["Frontend Developer", "UI UX Design"],
      period: 2000,
      txt: '',
      loopNum: 0,
      isDeleting: false,
      // Pricing plans
      pricingPlans: [
        {
          id: 'starter',
          title: 'Starter',
          price: '$79',
          description: 'Ideal untuk landing sederhana atau MVP kecil.',
          features: [
            '1 landing page responsif',
            'Implementasi desain dasar',
            'Optimasi dasar performance',
            'Deploy & konfigurasi domain'
          ],
          ctaText: 'Start Starter',
          ctaHref: 'https://wa.me/6289630399769?text=Halo%2C%20saya%20ingin%20ambil%20paket%20Starter%20%2479.%20Boleh%20dibantu%20timeline%20dan%20kebutuhannya%3F'
        },
        {
          id: 'standard',
          title: 'Standard',
          price: '$199',
          description: 'Cocok untuk website multi-halaman dengan integrasi sederhana.',
          features: [
            '3–5 halaman (Home, About, Portfolio, Contact)',
            'Integrasi API dasar (email/DB)',
            'Aksesibilitas & SEO lebih baik',
            'Analytics & form contact'
          ],
          featured: true,
          ctaText: 'Choose Standard',
          ctaHref: 'https://wa.me/6289630399769?text=Halo%2C%20saya%20tertarik%20paket%20Standard%20%24199%20(Recommended).%20Mohon%20detail%20fitur%20dan%20estimasi%20waktu%2C%20ya.'  
        },
        {
          id: 'pro',
          title: 'Pro',
          price: '$499',
          description: 'Untuk produk lebih kompleks dan siap scale.',
          features: [
            '6+ halaman / fitur khusus',
            'Integrasi auth / DB (Supabase)',
            'Audit Core Web Vitals 90+',
            'CI/CD & dokumentasi singkat'
          ],
          ctaText: 'Go Pro',
          ctaHref: 'https://wa.me/6289630399769?text=Halo%2C%20saya%20ingin%20diskusi%20paket%20Pro%20%24499%20untuk%20fitur%20khusus.%20Bisa%20set%20jadwal%20call%3F'
        }
      ],
      // About section data
      certs: [
        { id: 1, title: 'Responsive Web Design', issuer: 'Coursera', year: '2024', url: '#', logo: 'https://picsum.photos/seed/coursera/64/64', image: 'https://picsum.photos/id/1015/800/480' },
        { id: 2, title: 'Foundations of UI/UX', issuer: 'Google', year: '2024', url: '#', logo: 'https://picsum.photos/seed/google/64/64', image: 'https://picsum.photos/id/1016/800/480' },
        { id: 3, title: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2023', url: '#', logo: 'https://picsum.photos/seed/fcc/64/64', image: 'https://picsum.photos/id/1025/800/480' },
      ],
      // Portfolio section data
      portfolioItems: [
        {
          id: 1,
          name: 'Personal Website',
          imageUrl: 'portofolio',
          status: 'My personal website, I created this website to display my profile, skills and projects. As well as my place to try new technology.',
          tech: 'VueJS 3, Tailwind',
          github: 'https://github.com/Febrianpane',
          demo: 'https://github.com/Febrianpane'
        },
        {
          id: 2,
          name: 'UI UX DESIGN',
          imageUrl: 'portfolio-uiux',
          status: 'Design website marketplace ',
          tech: 'FIGMA',
          github: 'null',
          demo: 'https://www.figma.com/design/M0x1q9uDrHNb6x3rDOQD1g/E-Commerce-Website-UI-UX-Design-(ASAKA-PRIMA))?node-id=178-3781&m=dev&t=M6PfU4movWzFyNlA-1'
        },
        {
          id: 3,
          name: 'AsakaPrima ',
          imageUrl: 'portofolio2',
          status: ' Landing Page E-commerce  ',
          tech: 'VueJS 3, tailwindcss',
          github: 'null',
          demo: 'https://asakaprima.netlify.app/'
        },
        {
          id: 4,
          name: 'Marketplace',
          imageUrl: 'portofolio1',
          status: 'SEDANG PROSES',
          tech: 'codeigniter 4, vuejs 3, tailwindcss, php, mysql,',
          github: 'null',
          demo: 'null'
        }
      ],
      // Contact form state
      contactName: '',
      contactEmail: '',
      contactMessage: '',
      // Comments state
      comments: [],
      newCommentName: '',
      newCommentMessage: '',
      newCommentPhotoFile: null,
      newCommentPhotoName: '',
      commentsChannel: null,
      newCommentIds: [],
      // EmailJS + validation state
      isSending: false,
      contactErrors: [],
      contactSuccess: null,
      contactBotField: '' // honeypot
    };
  },
  computed: {
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
      // Pricing is static; no fetch needed

      // IntersectionObserver for reveal animations
      const ioReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            ioReveal.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const els = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-scale');
      els.forEach((el) => ioReveal.observe(el));
    });
    // Init Supabase comments after first render (only if env available)
    if (supabase) {
      this.initComments()
    } else {
      console.warn('[comments] Supabase not configured; skipping comments init')
    }
  },
  beforeUnmount() {
    try {
      if (this.commentsChannel) {
        supabase.removeChannel(this.commentsChannel)
        this.commentsChannel = null
      }
    } catch (e) { /* noop */ }
  },
  methods: {
    whatsAppLink(plan) {
      try {
        const phone = '6289630399769'
        const text = `Halo, saya tertarik paket ${plan.title} — ${plan.price}. Mohon detail fitur dan estimasi waktu.`
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
        return url
      } catch {
        return plan.ctaHref || '#'
      }
    },
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
    async submitContact() {
      this.contactErrors = []
      this.contactSuccess = null

      // Honeypot check
      if (this.contactBotField) {
        return
      }

      // Basic validation
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.contactName || this.contactName.length < 2) this.contactErrors.push('Nama minimal 2 karakter')
      if (!emailRe.test(this.contactEmail)) this.contactErrors.push('Email tidak valid')
      if (!this.contactMessage || this.contactMessage.length < 10) this.contactErrors.push('Pesan minimal 10 karakter')
      if (this.contactErrors.length) return

      // Kirim email saja via EmailJS (tanpa menyimpan ke tabel contacts)
      this.isSending = true
      try {
        const payload = {
          name: this.contactName.trim(),
          email: this.contactEmail.trim(),
          message: this.contactMessage.trim()
        }

        const serviceId = process.env.VUE_APP_EMAILJS_SERVICE_ID
        const templateId = process.env.VUE_APP_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.VUE_APP_EMAILJS_PUBLIC_KEY
        if (!serviceId || !templateId || !publicKey) {
          throw new Error('Email belum terkonfigurasi. Isi VUE_APP_EMAILJS_* di .env lalu restart server.')
        }

        await emailjs.send(
          serviceId,
          templateId,
          {
            // dukung dua gaya variabel
            from_name: payload.name,
            from_email: payload.email,
            name: payload.name,
            email: payload.email,
            message: payload.message
          },
          publicKey
        )

        this.contactSuccess = 'Pesan berhasil dikirim!'
        this.contactName = ''
        this.contactEmail = ''
        this.contactMessage = ''
      } catch (e) {
        const msg = (e && e.message) ? e.message : 'Gagal mengirim pesan. Coba lagi nanti.'
        alert(msg)
        console.error('[contact] submit failed:', e)
      } finally {
        this.isSending = false
      }
    },
    onPhotoChange(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      this.newCommentPhotoFile = file;
      this.newCommentPhotoName = file.name;
    },
    async initComments() {
      if (!supabase) return
      try {
        // Initial fetch (approved only)
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(50)
        if (error) throw error
        this.comments = (data || []).map(r => ({
          id: r.id,
          name: r.name,
          message: r.message,
          avatarUrl: r.photo_url || undefined,
          date: this.formatDate(r.created_at)
        }))

        // Realtime subscription for INSERT
        this.commentsChannel = supabase.channel('comments-realtime')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => {
            const r = payload.new
            if (r && r.approved) {
              this.comments.unshift({
                id: r.id,
                name: r.name,
                message: r.message,
                avatarUrl: r.photo_url || undefined,
                date: this.formatDate(r.created_at)
              })
              this.markNew(r.id)
            }
          })
          .subscribe()
      } catch (e) {
        console.warn('[comments] init failed:', e)
      }
    },
    formatDate(iso) {
      try {
        const d = new Date(iso)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      } catch {
        return ''
      }
    },
    async uploadAvatar(file) {
      if (!supabase) {
        alert('Upload avatar nonaktif: konfigurasi Supabase belum tersedia.');
        return null
      }
      if (!file) return null
      const path = `avatars/${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`
      try {
        const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'image/jpeg/jpg'
        })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        return data?.publicUrl || null
      } catch (e) {
        console.warn('[avatars] upload failed, continue without photo:', e)
        return null
      }
    },
    isNewComment(id) {
      return this.newCommentIds.includes(id)
    },
    markNew(id) {
      if (!id) return
      if (!this.newCommentIds.includes(id)) {
        this.newCommentIds.push(id)
        setTimeout(() => this.unmarkNew(id), 2600)
      }
    },
    unmarkNew(id) {
      const idx = this.newCommentIds.indexOf(id)
      if (idx !== -1) this.newCommentIds.splice(idx, 1)
    },
    async submitComment() {
      if (!supabase) {
        alert('Komentar sementara nonaktif: konfigurasi Supabase belum tersedia.');
        return
      }
      // Basic validation to satisfy DB CHECK constraints (e.g., message min length)
      const name = (this.newCommentName || '').trim()
      const message = (this.newCommentMessage || '').trim()
      if (!name || !message) return
      if (name.length < 2) {
        alert('Nama minimal 2 karakter')
        return
      }
      if (message.length < 10) {
        alert('Pesan minimal 10 karakter')
        return
      }
      try {
        // Optional avatar upload
        let photoUrl = null
        if (this.newCommentPhotoFile) {
          photoUrl = await this.uploadAvatar(this.newCommentPhotoFile)
        }

        const { error } = await supabase.from('comments').insert({
          name,
          message,
          photo_url: photoUrl,
          approved: true
        })
        if (error) throw error

        // Clear form; realtime will prepend the new comment
        this.newCommentName = ''
        this.newCommentMessage = ''
        this.newCommentPhotoFile = null
        this.newCommentPhotoName = ''
      } catch (e) {
        const msg = (e && e.message) ? e.message : 'Gagal mengirim komentar. Coba lagi nanti.'
        // Tampilkan pesan error asli dari Supabase jika ada (misal karena RLS atau tabel/kolom tidak ada)
        alert(msg)
        console.error('[comments] submit failed:', e)
      }
    },
    data() {
      return {
        pricingPlans: [
          {
            title: 'Personal',
            price: '$9.99',
            features: ['1GB Storage', '2GB Bandwidth', '10 Users']
          },
          {
            title: 'Business',
            price: '$19.99',
            features: ['5GB Storage', '10GB Bandwidth', '50 Users']
          },
          {
            title: 'Enterprise',
            price: '$49.99',
            features: ['20GB Storage', '50GB Bandwidth', '200 Users']
          }
        ]
      }
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

/* image stays static; beat effect removed */

/* Smooth spin when music is playing (class toggled by AvatarVisualizer events) */
.spin-on-play {
  will-change: transform;
  animation: avatarSpin 14s linear infinite;
  transform-origin: 50% 50%;
}

@keyframes avatarSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spin-on-play { animation-duration: 0s; animation-iteration-count: 0; }
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

/* About section styles */
.reveal {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.in-view {
  opacity: 1;
}

.reveal-up {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 600ms ease forwards;
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-scale.in-view {
  opacity: 1;
  transform: scale(1);
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, 10px); }
}

@keyframes float-delay {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -10px); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 10s ease-in-out infinite;
}

.animate-ring-soft {
  animation: ring-pulse 3s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.1); }
  50% { box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.2); }
}

/* Portfolio section styles */
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
}

svg:hover {
  stroke: #ffdb70;
}

@keyframes fadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-zoom-in {
  animation: fadeZoomIn 1s ease-in-out;
}

/* Games section styles */
.btn-base { 
  padding: 0.5rem 1rem; 
  font-weight: 600; 
  transition: all .2s ease; 
}

.no-scrollbar::-webkit-scrollbar { 
  display: none; 
}

.no-scrollbar { 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity .15s ease; 
}

.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

/* Disable global smooth to avoid double-animations; we use explicit smooth where needed */
html {
  scroll-behavior: auto;
}

/* Section spacing */
section {
  scroll-margin-top: 100px;
}
@media (max-width: 767px) {
  section { scroll-margin-top: 120px; }
}
@media (max-width: 639px) {
  section { scroll-margin-top: 144px; }
}

/* ===== HOLOGRAPHIC PROFILE CARD STYLES ===== */
.pc-card-wrapper,
.pc-card-wrapper-small {
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --card-radius: 20px;
  
  perspective: 500px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: none;
}

.pc-card-wrapper {
  margin: 3rem auto;
  max-width: 400px;
}

.pc-card-wrapper-small {
  width: 100%;
  max-width: 240px;
}

.pc-card-wrapper::before,
.pc-card-wrapper-small::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: inherit;
  background-position: inherit;
  border-radius: inherit;
  transition: all 0.5s ease;
  filter: contrast(1.2) saturate(1.2) blur(20px);
  transform: scale(0.85) translate3d(0, 0, 0.1px);
  background-size: 100% 100%;
  background-image: radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(45,100%,70%,calc(var(--card-opacity)*0.15)) 4%,hsla(45,80%,60%,calc(var(--card-opacity)*0.1)) 10%,hsla(45,50%,50%,calc(var(--card-opacity)*0.05)) 50%,hsla(45,0%,40%,0) 100%),radial-gradient(35% 52% at 55% 20%,#fbbf2420 0%,#07141f00 100%),radial-gradient(100% 100% at 50% 50%,#f59e0b15 1%,#07141f00 76%),conic-gradient(from 124deg at 50% 50%,#fbbf2425 0%,#f59e0b20 40%,#f59e0b20 60%,#fbbf2425 100%);
}

.pc-card-wrapper:hover::before,
.pc-card-wrapper.active::before,
.pc-card-wrapper-small:hover::before,
.pc-card-wrapper-small.active::before {
  filter: contrast(1) saturate(2) blur(40px) opacity(1);
  transform: scale(0.9) translate3d(0, 0, 0.1px);
}

.pc-card-wrapper:hover,
.pc-card-wrapper.active,
.pc-card-wrapper-small:hover,
.pc-card-wrapper-small.active {
  --card-opacity: 1;
}

.pc-card,
.pc-card-small {
  display: grid;
  aspect-ratio: 0.718;
  border-radius: var(--card-radius);
  position: relative;
  background-blend-mode: color-dodge, normal, normal, normal;
  box-shadow: rgba(0, 0, 0, 0.3) calc((var(--pointer-from-left) * 4px) - 1px) calc((var(--pointer-from-top) * 8px) - 2px) 10px -2px;
  transition: transform 1s ease;
  transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);
  background-size: 100% 100%;
  background-position: 0 0, 0 0, 50% 50%, 0 0;
  background-image:
    radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(45, 100%, 70%, calc(var(--card-opacity)*0.2)) 4%, hsla(45, 80%, 60%, calc(var(--card-opacity) * 0.15)) 10%, hsla(45, 50%, 50%, calc(var(--card-opacity) * 0.1)) 50%, hsla(45, 0%, 40%, 0) 100%),
    radial-gradient(35% 52% at 55% 20%, #fbbf2415 0%, #07141f00 100%),
    radial-gradient(100% 100% at 50% 50%, #f59e0b10 1%, #07141f00 76%),
    conic-gradient(from 124deg at 50% 50%, #fbbf2420 0%, #f59e0b18 40%, #f59e0b18 60%, #fbbf2420 100%);
  overflow: hidden;
}

.pc-card {
  height: 80svh;
  max-height: 540px;
}

.pc-card-small {
  height: auto;
  min-height: 280px;
  max-height: 340px;
}

.pc-card-small .pc-details {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

.pc-card:hover,
.pc-card.active,
.pc-card-small:hover,
.pc-card-small.active {
  transition: none;
  transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
}

.pc-card *,
.pc-card-small * {
  display: grid;
  grid-area: 1/-1;
  border-radius: var(--card-radius);
  transform: translate3d(0, 0, 0.1px);
  pointer-events: none;
}

.pc-inside {
  inset: 1px;
  position: absolute;
  background-image: linear-gradient(145deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%);
  background-color: rgba(0, 0, 0, 0.95);
  transform: translate3d(0, 0, 0.01px);
}

.pc-shine {
  transform: translate3d(0, 0, 1px);
  overflow: hidden;
  z-index: 3;
  mix-blend-mode: color-dodge;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.05));
}

.pc-glare {
  transform: translate3d(0, 0, 1.1px);
  overflow: hidden;
  background-image: radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(45, 100%, 75%) 12%, hsla(45, 60%, 40%, 0.15) 90%);
  mix-blend-mode: overlay;
  filter: brightness(0.95) contrast(1.05);
  z-index: 4;
}

.pc-avatar-content {
  mix-blend-mode: screen;
  overflow: hidden;
}

.pc-avatar-content .avatar {
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(1);
  bottom: 2px;
  opacity: calc(1.75 - var(--pointer-from-center));
}

.pc-user-info {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px 10px;
  pointer-events: auto;
}

.pc-user-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pc-mini-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.pc-mini-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.pc-user-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 3px;
}

.pc-handle {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
}

.pc-status {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
}

.pc-contact-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  background: transparent;
  pointer-events: auto;
}

.pc-contact-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.pc-content {
  max-height: 100%;
  overflow: hidden;
  text-align: center;
  position: relative;
  transform: translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px) !important;
  z-index: 5;
  mix-blend-mode: luminosity;
}

.pc-details {
  width: 100%;
  position: absolute;
  top: 2em;
  display: flex;
  flex-direction: column;
}

.pc-details h3 {
  font-weight: 700;
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 2rem);
  background-image: linear-gradient(to bottom, #ffffff, #fbbf24);
  background-size: 1em 1.5em;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
}

.pc-details p {
  font-weight: 600;
  position: relative;
  top: -8px;
  white-space: nowrap;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  margin: 0 auto;
  width: min-content;
  background-image: linear-gradient(to bottom, #fde68a, #f59e0b);
  background-size: 1em 1.5em;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

@media (max-width: 768px) {
  .pc-card {
    height: 70svh;
    max-height: 450px;
  }
  
  .pc-card-small {
    min-height: 240px;
    max-height: 300px;
    max-width: 200px;
  }
  
  .pc-card-small .pc-details {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  .pc-details h3 {
    font-size: clamp(1rem, 3.5vw, 1.5rem);
  }
  
  .pc-details p {
    font-size: clamp(0.6rem, 1.8vw, 0.8rem);
    top: -6px;
  }
  
  .pc-user-info {
    bottom: 10px;
    left: 10px;
    right: 10px;
    padding: 6px 8px;
  }
  
  .pc-mini-avatar {
    width: 26px;
    height: 26px;
  }
  
  .pc-handle {
    font-size: 10px;
  }
  
  .pc-status {
    font-size: 9px;
  }
  
  .pc-contact-btn {
    padding: 5px 10px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .pc-card-small {
    min-height: 200px;
    max-height: 260px;
    max-width: 180px;
  }
  
  .pc-card-small .pc-details {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  .pc-details {
    top: 1.2em;
  }
  
  .pc-details h3 {
    font-size: clamp(0.9rem, 3vw, 1.2rem);
  }
  
  .pc-details p {
    font-size: clamp(0.55rem, 1.5vw, 0.7rem);
    top: -4px;
  }
  
  .pc-user-info {
    bottom: 8px;
    left: 8px;
    right: 8px;
    padding: 5px 6px;
  }
  
  .pc-mini-avatar {
    width: 22px;
    height: 22px;
  }
  
  .pc-handle {
    font-size: 9px;
  }
  
  .pc-status {
    font-size: 8px;
  }
  
  .pc-contact-btn {
    padding: 4px 8px;
    font-size: 9px;
  }
}

.curved-loop-section {
  background: transparent;
  overflow: visible;
  margin-top: -10rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.comment-list-enter-active,
.comment-list-leave-active,
.comment-list-move {
  transition: all .35s cubic-bezier(.22,1,.36,1);
}
.comment-list-enter-from,
.comment-list-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
.comment-card {
  position: relative;
  background: rgba(20, 20, 22, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
  will-change: transform, box-shadow;
}
.comment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset;
  border-color: rgba(255,255,255,0.14);
}
.comment-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 0.75rem;
  background: conic-gradient(from 140deg, #7c3aed33, #06b6d433, #f59e0b33, #ec489933, #7c3aed33);
  filter: blur(10px);
  opacity: 0;
  transition: opacity .35s ease;
  z-index: -1;
}
.comment-card:hover::before { opacity: .9; }

.comment-card.is-new {
  animation: commentGlow 1.6s ease-in-out 0s 1, sheen 2.2s ease-out 0s 1;
  border-color: rgba(245, 158, 11, 0.45);
  background: linear-gradient(180deg, rgba(251, 191, 36, 0.06), rgba(20, 20, 22, 0.8));
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2) inset, 0 10px 28px rgba(0,0,0,0.45);
}
/* force wrap long words/URLs inside comment cards */
.comment-card {
  overflow: hidden;
}
.comment-card p,
.comment-card .text-sm,
.comment-card .text-xs {
  word-break: break-word;
  overflow-wrap: anywhere;
}
@keyframes commentGlow {
  0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
  60% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
}
@keyframes sheen {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.star-border {
  position: relative;
  isolation: isolate;
  overflow: visible;
}
.star-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from 0deg,
    #7f1d1d, /* red-900 */
    #991b1b, /* red-800 */
    #dc2626, /* red-600 */
    #ef4444, /* red-500 */
    #b91c1c, /* red-700 */
    #7f1d1d
  );
  padding: 1px;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: star-movement-bottom linear infinite alternate;
  opacity: 0.75;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.35);
  z-index: -1;
  will-change: transform;
}
.star-border::after { display: none; }
@keyframes sb-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes sb-twinkle {
  0%, 100% { opacity: .25; transform: scale(1); }
  50% { opacity: .55; transform: scale(1.02); }
}
</style>
