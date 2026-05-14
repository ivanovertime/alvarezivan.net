<script setup lang="ts">
const { data: page } = await useAsyncData('now', () => {
  return queryCollection('pages').path('/now').first()
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
    <UMain class="mt-20 px-2">
      <UContainer>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />
        </UPageBody>
      </UContainer>
    </UMain>
  </UPage>
</template>
