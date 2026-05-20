<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true
  })
}

type CategoryFilter = 'all' | 'article' | 'case-study' | 'side-project'
type TagFilter = string

const validCategory = (value: unknown): value is CategoryFilter =>
  value === 'all' || value === 'article' || value === 'case-study' || value === 'side-project'

const activeCategory = computed<CategoryFilter>(() => {
  const value = route.query.category
  return validCategory(value) ? value : 'all'
})

const parseTags = (value: unknown): string[] => {
  if (typeof value !== 'string') return []
  return value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
}

const activeTags = computed<TagFilter[]>(() => parseTags(route.query.tags))

const availableTags = computed(() => {
  const tagSet = new Set<string>()
  for (const post of posts.value ?? []) {
    for (const tag of post.tags ?? []) {
      tagSet.add(tag)
    }
  }
  return [...tagSet].sort((a, b) => a.localeCompare(b))
})

const setCategory = (category: CategoryFilter) => {
  const query = { ...route.query }
  if (category === 'all') {
    delete query.category
  } else {
    query.category = category
  }
  router.push({ path: route.path, query })
}

const setTag = (tag: TagFilter) => {
  const query = { ...route.query }
  const nextTags = new Set(activeTags.value)
  if (nextTags.has(tag)) {
    nextTags.delete(tag)
  } else {
    nextTags.add(tag)
  }

  if (nextTags.size === 0) {
    delete query.tags
  } else {
    query.tags = [...nextTags].join(',')
  }

  router.push({ path: route.path, query })
}

const clearTags = () => {
  const query = { ...route.query }
  delete query.tags
  router.push({ path: route.path, query })
}

const filters: Array<{ key: CategoryFilter, label: string, icon: string }> = [
  { key: 'all', label: 'All', icon: 'i-lucide-layout-grid' },
  { key: 'side-project', label: 'Side Project', icon: 'i-lucide-flask-conical' },
  { key: 'case-study', label: 'Case Study', icon: 'i-lucide-briefcase-business' },
  { key: 'article', label: 'Article', icon: 'i-lucide-newspaper' }
]

const filteredPosts = computed(() => {
  const all = posts.value ?? []
  return all.filter((post) => {
    const matchesCategory = activeCategory.value === 'all' || (post.category ?? 'article') === activeCategory.value
    const postTags = post.tags ?? []
    const matchesTags = activeTags.value.length === 0 || activeTags.value.every(tag => postTags.includes(tag))
    return matchesCategory && matchesTags
  })
})

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
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0 flex flex-col gap-6'
      }"
    >
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="filter in filters"
          :key="filter.key"
          :color="activeCategory === filter.key ? 'primary' : 'neutral'"
          :variant="activeCategory === filter.key ? 'soft' : 'ghost'"
          size="sm"
          :icon="filter.icon"
          :label="filter.label"
          data-analytics-event="blog_filter_click"
          data-analytics-category="content_discovery"
          :data-analytics-label="filter.key"
          data-analytics-location="blog_index"
          :data-analytics-destination="filter.key === 'all' ? '/blog' : `/blog?category=${filter.key}`"
          @click="setCategory(filter.key)"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          v-for="tag in availableTags"
          :key="tag"
          :color="activeTags.includes(tag) ? 'primary' : 'neutral'"
          :variant="activeTags.includes(tag) ? 'soft' : 'ghost'"
          size="xs"
          icon="i-lucide-tag"
          :label="tag"
          data-analytics-event="blog_filter_click"
          data-analytics-category="content_discovery"
          :data-analytics-label="tag"
          data-analytics-location="blog_index"
          :data-analytics-destination="`/blog?tags=${tag}`"
          @click="setTag(tag)"
        />
        <UButton
          v-if="activeTags.length"
          color="neutral"
          variant="ghost"
          size="xs"
          label="Clear tags"
          @click="clearTags"
        />
      </div>
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in filteredPosts"
          :key="post.path"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            data-analytics-event="blog_card_click"
            data-analytics-category="content"
            :data-analytics-label="post.title"
            data-analytics-location="blog_index"
            :data-analytics-destination="post.path"
            :to="post.path"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
              header:
                index % 2 === 0
                  ? 'sm:-rotate-1 overflow-visible'
                  : 'sm:rotate-1 overflow-visible'
            }"
          >
            <template #title>
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-if="(post.category ?? 'article') === 'article'"
                  color="neutral"
                  variant="soft"
                  size="xs"
                  icon="i-lucide-newspaper"
                  label="Article"
                />
                <UBadge
                  v-if="post.category === 'case-study'"
                  color="neutral"
                  variant="soft"
                  size="xs"
                  icon="i-lucide-briefcase-business"
                  label="Case Study"
                />
                <UBadge
                  v-if="post.category === 'side-project'"
                  color="neutral"
                  variant="soft"
                  size="xs"
                  icon="i-lucide-flask-conical"
                  label="Side Project"
                />
                <BlogTag
                  v-for="tag in (post.tags ?? []).slice(0, 2)"
                  :key="`${post.path}-${tag}`"
                  :tag="tag"
                  size="xs"
                />
                <UBadge
                  v-if="(post.tags ?? []).length > 2"
                  color="neutral"
                  variant="soft"
                  size="xs"
                  :label="`+${(post.tags ?? []).length - 2}`"
                />
                <span>{{ post.title }}</span>
              </div>
            </template>
          </UBlogPost>
        </Motion>
      </UBlogPosts>
      <p
        v-if="!filteredPosts.length"
        class="text-sm text-muted"
      >
        No posts match these filters yet.
      </p>
    </UPageSection>
  </UPage>
</template>
