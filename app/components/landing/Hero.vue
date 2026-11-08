<script setup lang="ts">
import type { HomeCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()
const { t } = useI18n()

const availabilityLabel = computed(() =>
  global.available ? t('hero.available') : t('hero.unavailable')
)

// Subtle attention pulse on the call CTA: a breathing shadow, infinite loop.
const ctaPulse = {
  boxShadow: [
    '0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.08)',
    '0 1px 2px rgb(0 0 0 / 0.06), 0 8px 26px rgb(0 0 0 / 0.18)',
    '0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.08)'
  ]
}
const ctaPulseTransition = {
  duration: 3.2,
  repeat: Infinity,
  ease: 'easeInOut' as const
}

defineProps<{
  page: HomeCollectionItem
}>()
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto px-4 sm:px-0',
      links: 'mt-4 flex-col justify-center items-center px-4 sm:px-0'
    }"
  >
    <template #headline>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1]
        }"
      >
        <UColorModeAvatar
          class="size-14 sm:size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
          :width="144"
          :height="144"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1]
        }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }"
      >
        <MDC
          :value="page.description"
          unwrap="p"
          class="prose prose-sm sm:prose-base dark:prose-invert mx-auto max-w-2xl text-pretty"
        />
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }"
      >
        <div
          v-if="page.hero.links"
          class="flex w-full flex-col items-center gap-2"
        >
          <p class="flex items-center justify-center gap-2 pb-1 text-sm text-muted">
            <span class="relative flex size-2.5 items-center justify-center">
              <span
                class="absolute inline-flex size-2.5 rounded-full opacity-60 animate-ping"
                :class="global.available ? 'bg-success' : 'bg-error'"
              />
              <span
                class="relative inline-flex size-1.5 rounded-full"
                :class="global.available ? 'bg-success' : 'bg-error'"
              />
            </span>
            {{ availabilityLabel }}
          </p>
          <MotionConfig reduced-motion="user">
            <Motion
              :initial="false"
              :animate="ctaPulse"
              :transition="ctaPulseTransition"
              class="min-w-[12rem]"
            >
              <UButton
                v-if="global.available"
                block
                color="neutral"
                icon="i-lucide-calendar"
                class="justify-center"
                :to="global.meetingLink"
                :label="t('hero.bookCall')"
                data-analytics-event="meeting_click"
                data-analytics-category="conversion"
                data-analytics-label="hero_primary"
                data-analytics-location="home_hero"
                :data-analytics-destination="global.meetingLink"
              />
            </Motion>
          </MotionConfig>
          <UButton
            color="neutral"
            variant="ghost"
            class="gap-2 w-auto min-w-[12rem] justify-center"
            data-analytics-event="cta_click"
            data-analytics-category="engagement"
            data-analytics-label="hero_blog"
            data-analytics-location="home_hero"
            :data-analytics-destination="page.hero.links[0]?.to"
            v-bind="page.hero.links[0]"
          />
        </div>
      </Motion>

      <div class="gap-2 sm:gap-x-4 inline-flex flex-wrap justify-center mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"

          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }"
        >
          <UButton
            data-analytics-event="social_click"
            data-analytics-category="social"
            :data-analytics-label="link['aria-label'] || link.to"
            data-analytics-location="home_hero"
            :data-analytics-destination="link.to"
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </template>
  </UPageHero>
</template>
