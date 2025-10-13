<template>
  <div :class="wrapperClass">
    <div class="flex items-center gap-3" v-if="align !== 'center'">
      <span v-if="showAccent" class="hidden md:inline-block h-px w-12 bg-gradient-to-r from-red-500/70 to-transparent dark:from-red-300/70"></span>
      <h3 data-scroll-target class="text-lg md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-red-600 dark:from-red-200 dark:to-red-400">{{ title }}</h3>
    </div>
    <div v-else>
      <h3 data-scroll-target class="text-lg md:text-2xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-red-600 dark:from-slate-100 dark:to-red-300">{{ title }}</h3>
    </div>
    <p v-if="subtitle" :class="subtitleClass">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    align: { type: String, default: 'center' }, // 'center' | 'left'
    showAccent: { type: Boolean, default: true }
  },
  computed: {
    wrapperClass() {
      return [
        'mb-6 md:mb-8',
        this.align === 'center' ? 'text-center' : 'text-left'
      ]
    },
    subtitleClass() {
      return [
        'mt-1 text-sm md:text-base text-gray-400',
        this.align === 'center' ? 'text-center' : ''
      ]
    }
  }
}
</script>

<style scoped>
</style>
