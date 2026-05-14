import type { NavigationMenuItem } from '@nuxt/ui'

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
  label: 'Uses',
  icon: 'i-lucide-wrench',
  to: '/uses'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about'
}]
