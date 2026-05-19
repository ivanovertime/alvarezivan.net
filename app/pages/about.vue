<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('pages').path('/about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const cvLinks = [
  {
    label: 'Download CV (English)',
    to: '/cv-en-ivan-alvarez.pdf'
  },
  {
    label: 'Descargar CV (Espanol)',
    to: '/cv-es-ivan-alvarez.pdf'
  }
]

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center py-8 sm:py-12',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
        :width="288"
        :height="288"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.4 }"
        :in-view-options="{ once: true }"
      >
        <UPageBody class="max-w-3xl mx-auto">
          <div class="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <UButton
              v-for="(link, index) in cvLinks"
              :key="link.to"
              :href="link.to"
              target="_blank"
              rel="noopener noreferrer"
              icon="i-lucide-download"
              size="lg"
              color="primary"
              :variant="index === 0 ? 'solid' : 'outline'"
              :label="link.label"
              data-analytics-event="cv_download_click"
              data-analytics-category="conversion"
              :data-analytics-label="link.label"
              data-analytics-location="about_page"
              :data-analytics-destination="link.to"
            />
          </div>

          <ContentRenderer
            v-if="page.body"
            :value="page"
          />
        </UPageBody>
      </Motion>
    </UPageSection>
  </UPage>
</template>
