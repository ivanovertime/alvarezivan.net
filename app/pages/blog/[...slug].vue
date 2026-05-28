<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const requestUrl = useRequestURL()

const baseUrl = computed(() => config.public.siteUrl || requestUrl.origin)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path === '/' ? '' : route.path}`)
const withBase = (url: string) =>
  url?.startsWith('http') ? url : `${baseUrl.value}${url?.startsWith('/') ? '' : '/'}${url}`

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').where('hidden', '=', false).path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: visiblePosts } = await useAsyncData('visible-blog-posts', () =>
  queryCollection('blog').where('hidden', '=', false).order('date', 'DESC').all()
)

const surround = computed(() => {
  const posts = visiblePosts.value ?? []
  const currentIndex = posts.findIndex(post => post.path === route.path)
  if (currentIndex === -1) return []

  // UContentSurround expects [previous, next]. With DESC dates,
  // previous is an older post and next is a newer post.
  const previous = posts[currentIndex + 1] ?? null
  const next = posts[currentIndex - 1] ?? null
  return [previous, next]
    .filter((item): item is NonNullable<typeof item> => item !== null && !!item.path)
    .map(item => ({
      title: item.title,
      description: item.description,
      path: item.path as string
    }))
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description
const ogImage = computed(() => page.value?.ogImage || page.value?.image || '/avatar.jpg')
const absoluteOgImage = computed(() => withBase(ogImage.value))
const publishedTime = computed(() => page.value?.date ? new Date(page.value.date).toISOString() : undefined)
const author = computed(() => ({
  ['@type']: 'Person' as const,
  name: page.value?.author?.name,
  url: page.value?.author?.to || `${baseUrl.value}/about`,
  image: page.value?.author?.avatar?.src ? withBase(page.value.author.avatar.src) : `${baseUrl.value}/avatar.jpg`
}))
const publisher = computed(() => ({
  ['@type']: 'Organization' as const,
  name: 'Ivan Over Time',
  url: baseUrl.value,
  logo: {
    ['@type']: 'ImageObject' as const,
    url: `${baseUrl.value}/avatar.jpg`
  }
}))
const showRepoCta = computed(() => page.value?.category === 'side-project' && Boolean(page.value?.repoUrl))
const postTags = computed(() => ((page.value as { tags?: string[] } | undefined)?.tags ?? []))

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
  ogType: 'article',
  ogUrl: canonicalUrl,
  ogImage: absoluteOgImage,
  twitterImage: absoluteOgImage,
  articlePublishedTime: publishedTime
})

// Per-page JSON-LD: Article. Person/WebSite are already declared globally
// in app.vue, so this just adds the Article node graph for this URL.
useSchemaOrg([
  defineArticle({
    headline: title,
    description,
    url: canonicalUrl.value,
    image: absoluteOgImage.value,
    datePublished: publishedTime.value,
    dateModified: publishedTime.value,
    author: author.value,
    publisher: publisher.value
  })
])

const articleLink = computed(() => canonicalUrl.value)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/blog"
          data-analytics-event="navigation_click"
          data-analytics-category="navigation"
          data-analytics-label="back_to_blog"
          data-analytics-location="blog_post"
          data-analytics-destination="/blog"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex flex-wrap text-xs text-muted items-center justify-center gap-2">
            <UBadge
              v-if="(page.category ?? 'article') === 'article'"
              color="neutral"
              variant="soft"
              size="xs"
              icon="i-lucide-newspaper"
              label="Article"
            />
            <UBadge
              v-if="page.category === 'case-study'"
              color="neutral"
              variant="soft"
              size="xs"
              icon="i-lucide-briefcase-business"
              label="Case Study"
            />
            <UBadge
              v-if="page.category === 'side-project'"
              color="neutral"
              variant="soft"
              size="xs"
              icon="i-lucide-flask-conical"
              label="Side Project"
            />
            <BlogTag
              v-for="tag in postTags"
              :key="tag"
              :tag="tag"
              size="xs"
            />
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              {{ page.minRead }} MIN READ
            </span>
          </div>
          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
            sizes="100vw sm:640px md:768px lg:1024px"
            width="1200"
            height="630"
            preload
            loading="eager"
            fetchpriority="high"
            decoding="async"
            format="webp"
            quality="70"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p
            v-if="page.outcome_headline"
            class="text-muted text-center text-lg max-w-2xl mx-auto"
          >
            {{ page.outcome_headline }}
          </p>
          <p
            v-else-if="page.description"
            class="text-muted text-center max-w-2xl mx-auto"
          >
            {{ page.description }}
          </p>
          <div
            v-if="showRepoCta"
            class="flex justify-center mt-2"
          >
            <UButton
              :to="page.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="repo_click"
              data-analytics-category="conversion"
              :data-analytics-label="page.title"
              data-analytics-location="blog_post"
              :data-analytics-destination="page.repoUrl"
              color="neutral"
              variant="soft"
              icon="i-lucide-github"
              label="View Repository"
            />
          </div>
          <div
            v-if="page.category === 'case-study'"
            class="flex flex-wrap items-center justify-center gap-2 text-xs text-muted"
          >
            <span v-if="page.year">{{ page.year }}</span>
            <span v-if="page.client">· {{ page.client }}</span>
            <span v-if="page.role">· {{ page.role }}</span>
            <span v-if="page.team_size">· Team of {{ page.team_size }}</span>
          </div>
          <div
            v-if="page.stack?.length"
            class="flex flex-wrap justify-center gap-2"
          >
            <UBadge
              v-for="s in page.stack"
              :key="s"
              color="neutral"
              variant="soft"
              size="xs"
            >
              {{ s }}
            </UBadge>
          </div>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              data-analytics-event="copy_link_click"
              data-analytics-category="engagement"
              :data-analytics-label="page.title"
              data-analytics-location="blog_post"
              :data-analytics-destination="articleLink"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
