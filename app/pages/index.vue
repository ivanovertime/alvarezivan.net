<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const pageKey = computed(() => `home:${route.path}:${locale.value}`)

const { data: page } = await useAsyncData(pageKey, () => {
  return queryCollection('home').where('locale', '=', locale.value).first()
}, {
  watch: [() => route.path, locale]
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: () => page.value?.seo.title || page.value?.title,
  ogTitle: () => page.value?.seo.title || page.value?.title,
  description: () => page.value?.seo.description || page.value?.description,
  ogDescription: () => page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <LandingFAQ :page />
    <UPageSection
      :ui="{
        container: '!pt-0 flex flex-col gap-8'
      }"
    >
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingBlog :page />
    <LandingTestimonials :page />
  </UPage>
</template>
