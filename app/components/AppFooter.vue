<script setup lang="ts">
const { footer } = useAppConfig()
const { locale } = useI18n()
const localePath = useLocalePath()
const localeLinks = useLocaleSwitcherLinks()
const localeSwitch = computed(() => locale.value === 'es'
  ? {
      label: 'English',
      to: localeLinks.value.en,
      analyticsLabel: 'footer_switch_english'
    }
  : {
      label: 'Español',
      to: localeLinks.value.es,
      analyticsLabel: 'footer_switch_spanish'
    })
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
          :to="localeSwitch.to"
          data-analytics-event="navigation_click"
          data-analytics-category="navigation"
          :data-analytics-label="localeSwitch.analyticsLabel"
          data-analytics-location="footer"
          :data-analytics-destination="localeSwitch.to"
          class="text-muted hover:text-primary transition-colors"
        >
          {{ localeSwitch.label }}
        </NuxtLink>
        <span class="hidden sm:inline text-default/30">·</span>
        <NuxtLink
          :to="localePath('/uses')"
          data-analytics-event="navigation_click"
          data-analytics-category="navigation"
          data-analytics-label="footer_uses"
          data-analytics-location="footer"
          :data-analytics-destination="localePath('/uses')"
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
          data-analytics-event="social_click"
          data-analytics-category="social"
          :data-analytics-label="link['aria-label'] || link.to"
          data-analytics-location="footer"
          :data-analytics-destination="link.to"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
      <NuxtLink
        :to="localePath('/')"
        aria-label="Ivan Over Time home"
        data-analytics-event="navigation_click"
        data-analytics-category="navigation"
        data-analytics-label="footer_home_logo"
        data-analytics-location="footer"
        :data-analytics-destination="localePath('/')"
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
