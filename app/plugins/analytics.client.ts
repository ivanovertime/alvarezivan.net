export default defineNuxtPlugin(() => {
  const router = useRouter()
  const measurementId = 'G-HM1BLYRYW0'
  const isDev = import.meta.dev

  const debugLog = (type: 'event' | 'pageview', name: string, params: Record<string, string | number | boolean | undefined>) => {
    if (!isDev) return
    console.info(`[analytics:${type}] ${name}`, params)
  }

  const trackEvent = (name: string, params: Record<string, string | number | boolean | undefined>) => {
    if (typeof window === 'undefined' || !window.gtag) return
    debugLog('event', name, params)
    window.gtag('event', name, params)
  }

  const trackPageView = (path: string) => {
    if (typeof window === 'undefined' || !window.gtag) return
    const params = { page_path: path }
    debugLog('pageview', 'config', params)
    window.gtag('config', measurementId, params)
  }

  router.afterEach((to) => {
    trackPageView(to.fullPath)
  })

  if (typeof window === 'undefined' || window.__analyticsClickTrackingInstalled) return
  window.__analyticsClickTrackingInstalled = true

  const onClick = (event: MouseEvent) => {
    const originTarget = event.target
    if (!(originTarget instanceof Element)) return

    const element = originTarget.closest<HTMLElement>('[data-analytics-event], a[href]')
    if (!element || element.dataset.analyticsIgnore === 'true') return

    const customEvent = element.dataset.analyticsEvent
    if (customEvent) {
      trackEvent(customEvent, {
        event_category: element.dataset.analyticsCategory || 'engagement',
        event_label: element.dataset.analyticsLabel || undefined,
        location: element.dataset.analyticsLocation || window.location.pathname,
        destination: element.dataset.analyticsDestination || undefined
      })
      return
    }

    if (!(element instanceof HTMLAnchorElement)) return
    const href = element.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

    const url = new URL(href, window.location.origin)
    if (url.origin === window.location.origin) return

    trackEvent('outbound_click', {
      event_category: 'navigation',
      event_label: element.textContent?.trim().slice(0, 120) || url.hostname,
      location: window.location.pathname,
      destination: url.toString()
    })
  }

  document.addEventListener('click', onClick, true)
})
