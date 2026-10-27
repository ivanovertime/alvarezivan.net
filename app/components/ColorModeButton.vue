<script setup lang="ts">
const colorMode = useColorMode()

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <UButton
    aria-label="Switch between light and dark mode"
    color="neutral"
    variant="ghost"
    size="sm"
    class="rounded-full"
    @click="startViewTransition"
  >
    <!--
      Both glyphs ship in the markup and CSS picks one. A dynamic `:icon` here
      cannot be prerendered, so it would be fetched from `/api/_nuxt_icon` after
      hydration — which a static host answers with a 404, and a 404 is the one
      answer that does not fall back to the Iconify API.
    -->
    <template #leading="{ ui }">
      <UIcon
        name="i-lucide-sun"
        data-slot="leadingIcon"
        :class="[ui.leadingIcon({ active: false }), 'dark:hidden']"
      />
      <UIcon
        name="i-lucide-moon"
        data-slot="leadingIcon"
        :class="[ui.leadingIcon({ active: false }), 'hidden dark:inline-block']"
      />
    </template>
  </UButton>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
