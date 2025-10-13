<script>
import SectionHeader from '@/components/SectionHeader.vue'
export default {
  components: { SectionHeader },
  data() {
    return {
      activeTab: 1,
      items: [
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
          name: 'COMING SOON',
          imageUrl: 'portofolio1',
          status: 'LAGI PROSES!! ',
          tech: 'Codeigniter 4, VUEJS 3',
          github: 'null',
          demo: 'null'
        },
        {
          id: 4,
          name: 'COMING SOON',
          imageUrl: 'portofolio2',
          status: 'LAGI PROSES JUGAaaaaaa',
          tech: ' proses',
          github: 'null',
          demo: 'null'
        }
      ]
    };
  }
}
</script>
<template>
  <div class="section-container py-10 text-left">
    <article>
      <header>
        <SectionHeader title="Past Project Experience" subtitle="Explore the projects I've worked on so far" />
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3 2xl:gap-5 fade-zoom-in pb-20">
          <div v-for="item in items" :key="item.id">
            <div class="item-card glass-card glass-card-hover hover-lift flex flex-col items-center gap-2 rounded-xl md:gap-3 px-5 py-5 lg:px-5 ">
              <div class="flex items-center justify-center p-0 w-full zoom-in">
                <img alt="Project image" loading="lazy" decoding="async" class="drop-shadow-xl rounded-xl w-full object-cover"
                  :src="'/img/' + item.imageUrl + '.png'">
              </div>
              <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg">
                <div class="title-text font-medium text-slate-900 dark:text-white">{{ item.name }}</div>
                <div class="w-full text-left text-[10px] text-slate-700 dark:text-[#c1c1c1] md:text-xs lg:text-sm">
                  {{ item.status }}</div>
                <div class="w-full mt-4 text-normal text-sm text-left text-amber-700 dark:text-amber-200">
                  {{ item.tech }}
                </div>
                <div class="w-full flex justify-end">
                  <div class="flex cursor-pointer items-end gap-3 text-primary">
                    <a v-if="item.github !== 'null'"
                      :href="item.github" target="_blank" rel="noreferrer"
                      title="View github repository" class="transition-all hover:text-amber-300">
                      <svg stroke="currentColor"
                        fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                        height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                        </path>
                      </svg></a>
                    <a v-if="item.demo !== 'null'" :href="item.demo" target="_blank" rel="noreferrer"
                      title="View finished project" class="transition-all hover:text-amber-300">
                      <svg stroke="currentColor"
                        fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                        height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
}
svg:hover{
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

/* Menggunakan animasi pada elemen yang diinginkan */
.fade-zoom-in {
  animation: fadeZoomIn 1s ease-in-out;
}
</style>