<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      <div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span>{{ footer.credits }}</span>
        <span class="hidden sm:inline text-default/30">·</span>
        <NuxtLink
          to="/contact"
          class="text-muted hover:text-primary transition-colors"
        >
          Open to Senior/Lead roles
        </NuxtLink>
        <span class="hidden sm:inline text-default/30">·</span>
        <NuxtLink
          to="/uses"
          class="text-muted hover:text-primary transition-colors"
        >
          /uses
        </NuxtLink>
      </div>
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
      <NuxtLink
        to="/"
        aria-label="Ivan Over Time home"
        class="inline-flex h-6 items-center justify-center px-1 pb-px opacity-80 hover:opacity-100 transition-opacity"
      >
        <img
          src="/logo.svg"
          alt="Ivan Over Time logo"
          width="28"
          height="16"
          class="h-4 w-auto object-contain"
        >
      </NuxtLink>
    </template>
  </UFooter>
</template>
