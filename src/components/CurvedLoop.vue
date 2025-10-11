<script>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';

export default {
  name: 'CurvedLoop',
  props: {
    marqueeText: {
      type: String,
      default: ''
    },
    speed: {
      type: Number,
      default: 2
    },
    className: {
      type: String,
      default: ''
    },
    curveAmount: {
      type: Number,
      default: 400
    },
    direction: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    },
    interactive: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const text = computed(() => {
      const hasTrailing = /\s|\u00A0$/.test(props.marqueeText);
      return (hasTrailing ? props.marqueeText.replace(/\s+$/, '') : props.marqueeText) + '\u00A0';
    });

    const measureRef = ref(null);
    const textPathRef = ref(null);
    const pathRef = ref(null);
    const spacing = ref(0);
    const offset = ref(0);
    const uid = Math.random().toString(36).substr(2, 9);
    const pathId = `curve-${uid}`;

    const pathD = computed(() => `M-100,90 Q500,${90 + props.curveAmount} 1540,90`);

    const dragRef = ref(false);
    const lastXRef = ref(0);
    const dirRef = ref(props.direction);
    const velRef = ref(0);

    let animationFrame = null;

    const textLength = computed(() => spacing.value);
    const totalText = computed(() => {
      return textLength.value
        ? Array(Math.ceil(1800 / textLength.value) + 2)
            .fill(text.value)
            .join('')
        : text.value;
    });
    const ready = computed(() => spacing.value > 0);

    const updateSpacing = () => {
      if (measureRef.value) {
        spacing.value = measureRef.value.getComputedTextLength();
      }
    };

    const animate = () => {
      if (!spacing.value || !ready.value) return;

      const step = () => {
        if (!dragRef.value && textPathRef.value) {
          const delta = dirRef.value === 'right' ? props.speed : -props.speed;
          const currentOffset = parseFloat(textPathRef.value.getAttribute('startOffset') || '0');
          let newOffset = currentOffset + delta;

          const wrapPoint = spacing.value;
          if (newOffset <= -wrapPoint) newOffset += wrapPoint;
          if (newOffset >= wrapPoint) newOffset -= wrapPoint;

          textPathRef.value.setAttribute('startOffset', newOffset + 'px');
          offset.value = newOffset;
        }
        animationFrame = requestAnimationFrame(step);
      };
      step();
    };

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const onPointerDown = (e) => {
      if (!props.interactive) return;
      dragRef.value = true;
      lastXRef.value = e.clientX;
      velRef.value = 0;
      e.target.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!props.interactive || !dragRef.value || !textPathRef.value) return;
      const dx = e.clientX - lastXRef.value;
      lastXRef.value = e.clientX;
      velRef.value = dx;

      const currentOffset = parseFloat(textPathRef.value.getAttribute('startOffset') || '0');
      let newOffset = currentOffset + dx;

      const wrapPoint = spacing.value;
      if (newOffset <= -wrapPoint) newOffset += wrapPoint;
      if (newOffset >= wrapPoint) newOffset -= wrapPoint;

      textPathRef.value.setAttribute('startOffset', newOffset + 'px');
      offset.value = newOffset;
    };

    const endDrag = () => {
      if (!props.interactive) return;
      dragRef.value = false;
      dirRef.value = velRef.value > 0 ? 'right' : 'left';
    };

    const cursorStyle = computed(() => {
      return props.interactive ? (dragRef.value ? 'grabbing' : 'grab') : 'auto';
    });

    const isDarkMode = ref(false);

    const checkDarkMode = () => {
      isDarkMode.value = 
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const textFill = computed(() => {
      return isDarkMode.value ? '#f9fafb' : '#111827';
    });

    onMounted(() => {
      nextTick(() => {
        updateSpacing();
        animate();
        checkDarkMode();
        
        // Watch for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class']
        });
      });
    });

    onUnmounted(() => {
      stopAnimation();
    });

    watch([text, () => props.className], () => {
      nextTick(() => {
        updateSpacing();
      });
    });

    watch([spacing, () => props.speed], () => {
      stopAnimation();
      if (spacing.value) {
        animate();
      }
    });

    return {
      text,
      measureRef,
      textPathRef,
      pathRef,
      spacing,
      offset,
      pathId,
      pathD,
      dragRef,
      lastXRef,
      dirRef,
      velRef,
      textLength,
      totalText,
      ready,
      cursorStyle,
      onPointerDown,
      onPointerMove,
      endDrag,
      isDarkMode,
      textFill
    };
  }
};
</script>

<template>
  <div
    class="min-h-[250px] flex items-center justify-center w-full py-8"
    :style="{
      visibility: ready ? 'visible' : 'hidden',
      cursor: cursorStyle
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointerleave="endDrag"
  >
    <svg
      class="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"
      viewBox="0 0 1440 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <text ref="measureRef" xml:space="preserve" style="visibility: hidden; opacity: 0; pointer-events: none">
        {{ text }}
      </text>

      <defs>
        <path ref="pathRef" :id="pathId" :d="pathD" fill="none" stroke="transparent" />
      </defs>

      <text v-if="ready" xml:space="preserve" :class="className" :style="{ fill: textFill }">
        <textPath ref="textPathRef" :href="`#${pathId}`" :startOffset="offset + 'px'" xml:space="preserve">
          {{ totalText }}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Text color for light and dark mode */
.curved-text {
  fill: #111827 !important;
  transition: fill 0.3s ease;
}

/* Dark mode - using multiple selectors for compatibility */
@media (prefers-color-scheme: dark) {
  .curved-text {
    fill: #f9fafb !important;
  }
}

/* Class-based dark mode */
:global(.dark) .curved-text {
  fill: #f9fafb !important;
}

:global(html.dark) .curved-text {
  fill: #f9fafb !important;
}

:global(body.dark) .curved-text {
  fill: #f9fafb !important;
}

/* Data attribute dark mode */
:global([data-theme="dark"]) .curved-text {
  fill: #f9fafb !important;
}

/* Light mode explicit */
:global(.light) .curved-text,
:global(html.light) .curved-text,
:global(body:not(.dark)) .curved-text {
  fill: #111827 !important;
}

/* Responsive container adjustments */
@media (max-width: 768px) {
  .min-h-\[250px\] {
    min-height: 200px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .min-h-\[250px\] {
    min-height: 150px;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
