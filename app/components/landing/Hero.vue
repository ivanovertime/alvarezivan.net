<script setup lang="ts">
import type { HomeCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

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
          delay: 0.1
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
          delay: 0.1
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
          delay: 0.3
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
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links"
          class="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row"
        >
          <UButton
            class="w-auto min-w-[12rem] justify-center"
            data-analytics-event="cta_click"
            data-analytics-category="conversion"
            data-analytics-label="hero_primary"
            data-analytics-location="home_hero"
            v-bind="page.hero.links[0]"
          />
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2 w-auto min-w-[12rem] justify-center"
            :data-analytics-event="global.available ? 'meeting_click' : 'availability_click'"
            data-analytics-category="conversion"
            data-analytics-label="hero_availability"
            data-analytics-location="home_hero"
            :data-analytics-destination="global.available ? global.meetingLink : ''"
            :to="global.available ? global.meetingLink : ''"
            :label="global.available ? 'Available for new projects' : 'Not available at the moment'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.available ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
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
            delay: 0.5 + index * 0.1
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
