<script setup lang="ts">
const { data: page } = await useAsyncData('uses', () => {
  return queryCollection('uses').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

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
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left'
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />
    </UPageSection>
  </UPage>
</template>
