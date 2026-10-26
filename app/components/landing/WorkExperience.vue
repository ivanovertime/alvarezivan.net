<script setup lang="ts">
import type { HomeCollectionItem } from '@nuxt/content'

defineProps<{
  page: HomeCollectionItem
}>()
</script>

<template>
  <UPageSection
    v-if="page.experience.items?.length"
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <RevealOnce
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :delay="Math.min(index * 0.07, 0.21)"
          class="text-muted flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          <p class="text-sm">
            {{ experience.date }}
          </p>
          <USeparator class="hidden sm:block" />
          <ULink
            class="flex flex-wrap items-center gap-1"
            :to="experience.company.url"
            target="_blank"
          >
            <span class="text-sm">
              {{ experience.position }}
            </span>
            <div
              class="company-mark inline-flex items-center gap-1"
              :style="{ '--brand': experience.company.color }"
            >
              <span class="font-medium text-highlighted">{{ experience.company.name }}</span>
              <UIcon :name="experience.company.logo" />
            </div>
          </ULink>
        </RevealOnce>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>
/*
 * The brand hue is a cue, not information: it belongs on the small icon, never on the
 * company name — five coloured names compete with the site's own accent and the brightest
 * brands (lime, yellow) cannot be read as text on a light background. In light mode the hue
 * is mixed toward black so a lime or yellow mark stays visible; dark mode gets the pure hue.
 */
.company-mark {
  color: color-mix(in oklab, var(--brand) 62%, #0b1220);
}
.dark .company-mark {
  color: var(--brand);
}
</style>
