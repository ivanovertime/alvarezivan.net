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

export const useNavLinks = () => {
  const localePath = useLocalePath()
  const { locale } = useI18n()

  const labels = computed(() => locale.value === 'es'
    ? {
        home: 'Inicio',
        blog: 'Blog',
        now: 'Ahora',
        about: 'Sobre mi',
        contact: 'Contacto'
      }
    : {
        home: 'Home',
        blog: 'Blog',
        now: 'Now',
        about: 'About',
        contact: 'Contact'
      })

  return computed<NavigationMenuItem[]>(() => [{
    label: labels.value.home,
    icon: 'i-lucide-home',
    to: localePath('/')
  }, {
    label: labels.value.blog,
    icon: 'i-lucide-file-text',
    to: localePath('/blog')
  }, {
    label: labels.value.now,
    icon: 'i-lucide-radio',
    to: localePath('/now')
  }, {
    label: labels.value.about,
    icon: 'i-lucide-user',
    to: localePath('/about')
  }, {
    label: labels.value.contact,
    icon: 'i-lucide-mail',
    to: localePath('/contact')
  }])
}

export const useLocaleSwitcherLinks = () => {
  const route = useRoute()
  const currentPath = computed(() => normalizeRoute(route.path))

  return computed(() => {
    const fallback = currentPath.value
    if (!localizedRoutes.has(currentPath.value)) {
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
