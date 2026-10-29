import type { NavigationMenuItem } from '@nuxt/ui'

export const cvLinks = {
  en: '/files/cv/ivan-alvarez-en.pdf',
  es: '/files/cv/ivan-alvarez-es.pdf'
} as const

const localizedRoutes = new Set(['/', '/about', '/blog', '/contact', '/now', '/uses'])

const normalizeRoute = (path: string) => {
  const normalized = path.replace(/^\/es(?=\/|$)/, '')
  return normalized || '/'
}

const toLocalizedPath = (path: string, locale: 'en' | 'es') => {
  if (locale === 'en') return path
  return path === '/' ? '/es' : `/es${path}`
}

// Every shell route has a Spanish counterpart, and so does every blog path: a post
// ships with `content/es/blog/…` beside it. Keep that invariant, or this claims an
// `/es/blog/<slug>` URL that was never generated — the blog index already refuses to
// list a post that has no Spanish version, so the two stay consistent.
export const hasSpanishCounterpart = (path: string) => {
  const normalized = normalizeRoute(path)
  return localizedRoutes.has(normalized) || normalized.startsWith('/blog/')
}

export const useNavLinks = () => {
  const localePath = useLocalePath()
  const { t } = useI18n()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: localePath('/')
  }, {
    label: t('nav.blog'),
    icon: 'i-lucide-file-text',
    to: localePath('/blog')
  }, {
    label: t('nav.now'),
    icon: 'i-lucide-radio',
    to: localePath('/now')
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-user',
    to: localePath('/about')
  }, {
    label: t('nav.contact'),
    icon: 'i-lucide-mail',
    to: localePath('/contact')
  }])
}

export const useLocaleSwitcherLinks = () => {
  const route = useRoute()
  const currentPath = computed(() => normalizeRoute(route.path))

  return computed(() => {
    const fallback = currentPath.value
    if (!hasSpanishCounterpart(currentPath.value)) {
      return {
        en: fallback,
        es: fallback
      }
    }

    const targetPath = currentPath.value

    return {
      en: toLocalizedPath(targetPath, 'en'),
      es: toLocalizedPath(targetPath, 'es')
    }
  })
}
