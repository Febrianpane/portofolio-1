<template>
  <div
    :class="computedClasses"
    :style="inlineStyles"
    :data-text="children"
    :tabindex="enableOnHover ? 0 : null"
    role="heading"
    aria-level="1"
  >
    {{ children }}
  </div>
</template>

<script>
export default {
  name: 'GlitchText',
  props: {
    children: { type: String, required: true },
    speed: { type: Number, default: 0.5 },
    enableShadows: { type: Boolean, default: true },
    enableOnHover: { type: Boolean, default: false },
    className: { type: String, default: '' }
  },
  data() {
    return {
      hasHover: true,
      mql: null,
    }
  },
  computed: {
    inlineStyles() {
      return {
        '--after-duration': `${this.speed * 3}s`,
        '--before-duration': `${this.speed * 2}s`,
        '--after-shadow': this.enableShadows ? '-5px 0 red' : 'none',
        '--before-shadow': this.enableShadows ? '5px 0 cyan' : 'none'
      };
    },
    computedClasses() {
      const baseClasses = [
        'text-white',
        'font-black',
        'whitespace-nowrap',
        'relative',
        'transform-gpu',
        'translate-y-0',
        'mx-auto',
        'select-none',
        'cursor-default',
        'text-[clamp(2rem,10vw,8rem)]',
        'isolate',
        'glitch',

        // Pseudo elements must not capture taps
        'before:pointer-events-none',
        'before:absolute',
        'before:top-0',
        'before:text-white',
        'before:bg-[#0b0b0b]',
        'before:overflow-hidden',
        'before:[clip-path:inset(0_0_0_0)]',

        'after:pointer-events-none',
        'after:absolute',
        'after:top-0',
        'after:text-white',
        'after:bg-[#0b0b0b]',
        'after:overflow-hidden',
        'after:[clip-path:inset(0_0_0_0)]'
      ];

      const normalGlitch = [
        'before:content-[attr(data-text)]',
        'before:left-[-10px]',
        'before:[text-shadow:var(--before-shadow,10px_0_cyan)]',
        'before:[animation:animate-glitch_var(--before-duration,2s)_infinite_linear_alternate-reverse]',

        'after:content-[attr(data-text)]',
        'after:left-[10px]',
        'after:[text-shadow:var(--after-shadow,-10px_0_red)]',
        'after:[animation:animate-glitch_var(--after-duration,3s)_infinite_linear_alternate-reverse]'
      ]

      const hoverGlitch = [
        'before:content-[""]',
        'before:opacity-0',
        'before:[animation:none]',
        'after:content-[""]',
        'after:opacity-0',
        'after:[animation:none]',

        // Hover activation
        'hover:before:content-[attr(data-text)]',
        'hover:before:opacity-100',
        'hover:before:left-[-10px]',
        'hover:before:[text-shadow:var(--before-shadow,10px_0_cyan)]',
        'hover:before:[animation:animate-glitch_var(--before-duration,2s)_infinite_linear_alternate-reverse]',

        'hover:after:content-[attr(data-text)]',
        'hover:after:opacity-100',
        'hover:after:left-[10px]',
        'hover:after:[text-shadow:var(--after-shadow,-10px_0_red)]',
        'hover:after:[animation:animate-glitch_var(--after-duration,3s)_infinite_linear_alternate-reverse]',

        // Touch/press activation via :active and :focus
        'active:before:content-[attr(data-text)]',
        'active:before:opacity-100',
        'active:before:left-[-10px]',
        'active:before:[text-shadow:var(--before-shadow,10px_0_cyan)]',
        'active:before:[animation:animate-glitch_var(--before-duration,2s)_infinite_linear_alternate-reverse]',

        'active:after:content-[attr(data-text)]',
        'active:after:opacity-100',
        'active:after:left-[10px]',
        'active:after:[text-shadow:var(--after-shadow,-10px_0_red)]',
        'active:after:[animation:animate-glitch_var(--after-duration,3s)_infinite_linear_alternate-reverse]',

        'focus:before:content-[attr(data-text)]',
        'focus:before:opacity-100',
        'focus:before:left-[-10px]',
        'focus:before:[text-shadow:var(--before-shadow,10px_0_cyan)]',
        'focus:before:[animation:animate-glitch_var(--before-duration,2s)_infinite_linear_alternate-reverse]',

        'focus:after:content-[attr(data-text)]',
        'focus:after:opacity-100',
        'focus:after:left-[10px]',
        'focus:after:[text-shadow:var(--after-shadow,-10px_0_red)]',
        'focus:after:[animation:animate-glitch_var(--after-duration,3s)_infinite_linear_alternate-reverse]'
      ]

      const classes = [...baseClasses]

      // Apply behavior: if enableOnHover, activate on hover; else always-on regardless of hover capability
      if (this.enableOnHover) {
        classes.push(...hoverGlitch)
      } else {
        classes.push(...normalGlitch)
      }

      if (this.className) classes.push(this.className)
      return classes.join(' ')
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mql = window.matchMedia('(hover: hover) and (pointer: fine)')
      this.hasHover = !!this.mql.matches
      try { this.mql.addEventListener('change', this._onHoverChange) } catch (e) { if (this.mql && this.mql.addListener) this.mql.addListener(this._onHoverChange) }
    }
  },
  beforeUnmount() {
    if (this.mql) {
      try { this.mql.removeEventListener('change', this._onHoverChange) } catch (e) { if (this.mql && this.mql.removeListener) this.mql.removeListener(this._onHoverChange) }
    }
  },
  methods: {
    _onHoverChange(e) { this.hasHover = !!e.matches }
  }
};
</script>

<style>
/* When we explicitly disable hover effects */
.no-hover:before,
.no-hover:after { opacity: 0 !important; animation: none !important; }

@keyframes animate-glitch {
  0% {
    clip-path: inset(20% 0 50% 0);
  }
  5% {
    clip-path: inset(10% 0 60% 0);
  }
  10% {
    clip-path: inset(15% 0 55% 0);
  }
  15% {
    clip-path: inset(25% 0 35% 0);
  }
  20% {
    clip-path: inset(30% 0 40% 0);
  }
  25% {
    clip-path: inset(40% 0 20% 0);
  }
  30% {
    clip-path: inset(10% 0 60% 0);
  }
  35% {
    clip-path: inset(15% 0 55% 0);
  }
  40% {
    clip-path: inset(25% 0 35% 0);
  }
  45% {
    clip-path: inset(30% 0 40% 0);
  }
  50% {
    clip-path: inset(20% 0 50% 0);
  }
  55% {
    clip-path: inset(10% 0 60% 0);
  }
  60% {
    clip-path: inset(15% 0 55% 0);
  }
  65% {
    clip-path: inset(25% 0 35% 0);
  }
  70% {
    clip-path: inset(30% 0 40% 0);
  }
  75% {
    clip-path: inset(40% 0 20% 0);
  }
  80% {
    clip-path: inset(20% 0 50% 0);
  }
  85% {
    clip-path: inset(10% 0 60% 0);
  }
  90% {
    clip-path: inset(15% 0 55% 0);
  }
  95% {
    clip-path: inset(25% 0 35% 0);
  }
  100% {
    clip-path: inset(30% 0 40% 0);
  }
}
</style>
