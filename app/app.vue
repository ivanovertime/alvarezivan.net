<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const config = useRuntimeConfig()
const requestUrl = useRequestURL()
const { locale } = useI18n()
const navLinks = useNavLinks()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')
const baseUrl = computed(() => config.public.siteUrl || requestUrl.origin)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path === '/' ? '' : route.path}`)
const normalizedPath = computed(() => {
  const path = route.path.replace(/^\/es(?=\/|$)/, '')
  return path || '/'
})
const englishUrl = computed(() => `${baseUrl.value}${normalizedPath.value === '/' ? '' : normalizedPath.value}`)
const spanishUrl = computed(() => `${baseUrl.value}${normalizedPath.value === '/' ? '/es' : `/es${normalizedPath.value}`}`)
const hasSpanishVersion = computed(() =>
  new Set(['/', '/about', '/blog', '/contact', '/now', '/uses']).has(normalizedPath.value)
)

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    { name: 'apple-mobile-web-app-title', content: 'Ivan Over Time' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'canonical', href: canonicalUrl },
    ...(hasSpanishVersion.value
      ? [
          { rel: 'alternate', hreflang: 'en', href: englishUrl.value },
          { rel: 'alternate', hreflang: 'es', href: spanishUrl.value },
          { rel: 'alternate', hreflang: 'x-default', href: englishUrl.value }
        ]
      : []),
    { rel: 'alternate', type: 'application/rss+xml', title: 'Ivan Over Time RSS Feed', href: '/rss.xml' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    }
  ],
  script: [
    {
      key: 'gtag-src',
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-HM1BLYRYW0'
    },
    {
      key: 'gtag-init',
      innerHTML: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-HM1BLYRYW0\');'
    }
  ],
  htmlAttrs: {
    lang: locale
  }
}))

useSeoMeta({
  titleTemplate: '%s - Ivan Over Time',
  ogSiteName: 'Ivan Over Time',
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image'
})

// Auto-generate per-page Open Graph images via nuxt-og-image.
// Pages with their own ogImage in frontmatter (e.g. case studies)
// override this through useSeoMeta() in their page component.
// Component-name typing is generated from .nuxt; cast keeps tsc happy.
defineOgImageComponent('NuxtSeo' as never, {
  siteName: 'Ivan Over Time'
})

// Global JSON-LD: declare the site's Person + WebSite once.
// Page-specific schemas (Article, etc.) are added on the relevant pages.
useSchemaOrg([
  definePerson({
    name: 'Iván Álvarez',
    alternateName: 'Ivan Alvarez',
    jobTitle: 'Full-Stack Engineer',
    url: baseUrl.value,
    image: `${baseUrl.value}/avatar.jpg`,
    sameAs: [
      'https://www.linkedin.com/in/ialvarez93/',
      'https://github.com/ivanovertime'
    ]
  }),
  defineWebSite({
    name: 'Ivan Over Time',
    url: baseUrl.value
  }),
  defineWebPage()
])

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
