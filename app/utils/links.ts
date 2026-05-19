import type { NavigationMenuItem } from '@nuxt/ui'

export const cvLinks = {
  en: '/files/cv/ivan-alvarez-en.pdf',
  es: '/files/cv/ivan-alvarez-es.pdf'
} as const

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: 'Now',
  icon: 'i-lucide-radio',
  to: '/now'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about'
}, {
  label: 'Contact',
  icon: 'i-lucide-mail',
  to: '/contact'
}]
