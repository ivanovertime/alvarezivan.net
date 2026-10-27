import type { Mermaid, MermaidConfig } from 'mermaid'

const MERMAID_PRE_SELECTOR = 'pre.language-mermaid'
const MERMAID_RENDERED_ATTR = 'data-mermaid-rendered'
const MERMAID_GENERATED_ATTR = 'data-mermaid-generated'

// A fence becomes "due" this far below the fold, so the diagram is already
// drawn by the time it can be seen and the code fence it replaces never shows.
const PRELOAD_PX = 1600

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()

  let mermaid: Mermaid | null = null
  let sequence = 0
  let inFlight: Promise<void> | null = null
  let rerunRequested = false
  let resetRequested = false
  let listening = false
  let htmlClassObserver: MutationObserver | null = null

  const currentTheme = () => document.documentElement.classList.contains('dark') ? 'dark' : 'default'

  const fenceBlocks = () =>
    Array.from(document.querySelectorAll<HTMLElement>(MERMAID_PRE_SELECTOR))
      .filter(pre => (pre.textContent ?? '').trim() !== '')

  const pendingBlocks = () =>
    fenceBlocks().filter(pre => pre.getAttribute(MERMAID_RENDERED_ATTR) !== 'true')

  // Due means the fence top is above the horizon — not merely "intersecting".
  // A fling to the bottom of the page jumps a fence from below the viewport to
  // above it without ever intersecting, and an IntersectionObserver only fires
  // on threshold crossings, so it would never report that fence at all.
  const dueBlocks = () => {
    const horizon = window.innerHeight + PRELOAD_PX
    return pendingBlocks().filter(pre => pre.getBoundingClientRect().top < horizon)
  }

  const ensureMermaid = async () => {
    if (!mermaid) mermaid = (await import('mermaid')).default
    return mermaid
  }

  const buildConfig = (): MermaidConfig => ({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: currentTheme()
  })

  const resetRenderedBlocks = () => {
    document.querySelectorAll<HTMLElement>(`[${MERMAID_GENERATED_ATTR}="true"]`).forEach((node) => {
      node.remove()
    })

    document.querySelectorAll<HTMLElement>(`${MERMAID_PRE_SELECTOR}[${MERMAID_RENDERED_ATTR}="true"]`).forEach((pre) => {
      pre.removeAttribute(MERMAID_RENDERED_ATTR)
      pre.hidden = false
    })
  }

  const renderBlock = async (instance: Mermaid, pre: HTMLElement) => {
    const source = (pre.textContent ?? '').trim()
    if (!source) return

    try {
      const { svg } = await instance.render(`mermaid-fence-${Date.now()}-${sequence++}`, source)

      const container = document.createElement('div')
      container.className = 'mermaid-diagram my-5 overflow-x-auto rounded-md border border-default bg-elevated/40 p-4'
      container.setAttribute(MERMAID_GENERATED_ATTR, 'true')
      container.innerHTML = svg

      pre.after(container)
      pre.hidden = true
      pre.setAttribute(MERMAID_RENDERED_ATTR, 'true')
    } catch {
      const error = document.createElement('p')
      error.className = 'my-5 text-sm text-error'
      error.setAttribute(MERMAID_GENERATED_ATTR, 'true')
      error.textContent = 'Could not render Mermaid diagram. Check the diagram syntax.'
      pre.after(error)
      pre.setAttribute(MERMAID_RENDERED_ATTR, 'true')
    }
  }

  const renderPass = async () => {
    // A theme flip invalidates every diagram on the page; a scroll only owes
    // the reader the ones coming up.
    const reTheme = resetRequested
    if (resetRequested) {
      resetRequested = false
      resetRenderedBlocks()
    }

    const targets = reTheme ? pendingBlocks() : dueBlocks()

    // Bail before the import: a route with no diagram must not download, parse
    // and initialise mermaid at all.
    if (targets.length === 0) return

    const instance = await ensureMermaid()
    instance.initialize(buildConfig())

    for (const pre of reTheme ? pendingBlocks() : dueBlocks()) {
      await renderBlock(instance, pre)
    }
  }

  const requestRender = (options: { reset?: boolean } = {}) => {
    if (options.reset) resetRequested = true

    // One layout at a time. A theme flip or a route change that lands mid-render
    // joins the pass in flight instead of racing it into a second dagre layout.
    if (inFlight) {
      rerunRequested = true
      return
    }

    inFlight = (async () => {
      try {
        do {
          rerunRequested = false
          await renderPass()
        } while (rerunRequested || resetRequested)
      } finally {
        inFlight = null
      }
    })()
  }

  const checkFences = () => {
    if (dueBlocks().length > 0) requestRender()
  }

  const watchFences = () => {
    if (listening) return
    listening = true
    window.addEventListener('scroll', checkFences, { passive: true })
    window.addEventListener('resize', checkFences, { passive: true })
  }

  const watchThemeChanges = () => {
    htmlClassObserver?.disconnect()

    htmlClassObserver = new MutationObserver((mutations) => {
      const classChanged = mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')
      if (classChanged) {
        requestRender({ reset: true })
      }
    })

    htmlClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  nuxtApp.hook('app:mounted', () => {
    watchThemeChanges()
    watchFences()
    checkFences()
  })

  nuxtApp.hook('page:finish', () => {
    // One frame, so the incoming route's content is in the DOM before we look.
    window.requestAnimationFrame(checkFences)
  })
})
