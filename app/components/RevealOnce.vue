<script setup lang="ts">
withDefaults(defineProps<{
  /** Sustain after the entry trigger — keep it capped per index, never cumulative. */
  delay?: number
  /** Entrance travel in px. */
  y?: number
}>(), {
  delay: 0,
  y: 12
})

const reduceMotion = import.meta.client
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

const root = ref<HTMLElement>()
const pending = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = root.value
  if (!el || reduceMotion) return

  // A buffer below the fold lets font/layout settling between server and
  // client move a fold-adjacent card without ever re-hiding what was painted.
  // The page ships content visible — the prerendered HTML is the resting
  // state, so a stalled script hides nothing and the first frame never
  // flickers. Only content framed clearly below the fold goes pending.
  const fold = window.innerHeight + Math.max(window.innerHeight * 0.05, 48)
  if (el.getBoundingClientRect().top < fold) return

  // Reveals once: the moment the card's edge reaches 64px before the fold,
  // then never again — the Once Rule. The class drop transitions opacity and
  // transform through a transition already declared on the element.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          pending.value = false
          observer?.disconnect()
        }
      }
    },
    { rootMargin: '0px 0px 64px 0px', threshold: 0.05 }
  )
  observer.observe(el)
  pending.value = true
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="root"
    class="reveal-once"
    :class="{ 'reveal-pending': pending }"
    :style="{ '--reveal-y': `${y}px`, 'transition-delay': `${delay}s` }"
  >
    <slot />
  </div>
</template>

<style scoped>
/*
 * The resting state is visible — no class. `reveal-pending` hides; its removal
 * animates back through the base transition. Hides happen off-screen, so no
 * visible flash exists by construction.
 */
.reveal-once {
  transition: opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-pending {
  opacity: 0;
  transform: translateY(var(--reveal-y, 12px));
}
</style>
