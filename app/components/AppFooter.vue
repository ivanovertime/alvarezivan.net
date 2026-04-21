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
        <NuxtLink
          to="/"
          aria-label="Ivan Over Time home"
          class="inline-flex items-center justify-center"
        >
          <img
            src="/logo.svg"
            alt="Ivan Over Time logo"
            width="32"
            height="32"
            class="h-8 w-8"
          >
        </NuxtLink>

        <span>{{ footer.credits }}</span>
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
    </template>
  </UFooter>
</template>
