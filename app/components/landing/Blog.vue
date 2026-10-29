<script setup lang="ts">
import type { HomeCollectionItem } from '@nuxt/content'

defineProps<{
  page: HomeCollectionItem
}>()

const { locale, t } = useI18n()

// The key carries the locale because the query is locale-dependent below: a
// locale-neutral key would replay the other language's payload on client-side nav.
const { data: posts } = await useAsyncData(`index-blogs-${locale.value}`, () =>
  queryCollection('blog')
    .where('hidden', '=', false)
    .where('locale', '=', locale.value)
    .order('date', 'DESC')
    .limit(3)
    .all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: 'blogs posts not found', fatal: true })
}

// The SQL `where` does the real work; `filterByLocale` stays as a belt-and-suspenders
// guard until prod D1 parity is confirmed for the `blog` collection (the `home`
// collection already filters by locale in SQL on production, so the pattern is proven).
const latestPosts = computed(() => filterByLocale(posts.value ?? [], locale.value))
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in latestPosts"
        :key="index"
        orientation="horizontal"
        variant="naked"
        data-analytics-event="blog_card_click"
        data-analytics-category="content"
        :data-analytics-label="post.title"
        data-analytics-location="home_blog"
        :data-analytics-destination="post.path"
        :to="post.path"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #date>
          {{ formatPostDate(post.date, locale) }}
        </template>
        <template #footer>
          <UButton
            size="xs"
            variant="link"
            class="px-0 gap-0"
            :label="t('blog.readArticle')"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
