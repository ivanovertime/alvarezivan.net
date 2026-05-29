import type { Mermaid, MermaidConfig } from 'mermaid'

const MERMAID_PRE_SELECTOR = 'pre.language-mermaid'
const MERMAID_RENDERED_ATTR = 'data-mermaid-rendered'

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()

  let mermaid: Mermaid | null = null
  let sequence = 0
  let pending = false
  let htmlClassObserver: MutationObserver | null = null

  const currentTheme = () => document.documentElement.classList.contains('dark') ? 'dark' : 'default'

  const ensureMermaid = async () => {
    if (mermaid) return mermaid

    mermaid = (await import('mermaid')).default
    return mermaid
  }

  const buildConfig = (): MermaidConfig => ({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: currentTheme()
  })

  const cleanupRenderedBlocks = () => {
    const renderedNodes = document.querySelectorAll<HTMLElement>('[data-mermaid-generated="true"]')
    renderedNodes.forEach((node) => {
      node.remove()
    })

    const processedBlocks = document.querySelectorAll<HTMLElement>(`${MERMAID_PRE_SELECTOR}[${MERMAID_RENDERED_ATTR}="true"]`)
    processedBlocks.forEach((pre) => {
      pre.removeAttribute(MERMAID_RENDERED_ATTR)
      pre.hidden = false
    })
  }

  const renderMermaidBlocks = async () => {
    const instance = await ensureMermaid()
    instance.initialize(buildConfig())

    const blocks = document.querySelectorAll<HTMLElement>(`${MERMAID_PRE_SELECTOR}:not([${MERMAID_RENDERED_ATTR}="true"])`)

    for (const pre of blocks) {
      const source = pre.textContent?.trim() ?? ''
      if (!source) continue

      try {
        const id = `mermaid-fence-${Date.now()}-${sequence++}`
        const { svg } = await instance.render(id, source)

        const container = document.createElement('div')
        container.className = 'mermaid-diagram my-5 overflow-x-auto rounded-md border border-default bg-elevated/40 p-4'
        container.setAttribute('data-mermaid-generated', 'true')
        container.innerHTML = svg

        pre.after(container)
        pre.hidden = true
        pre.setAttribute(MERMAID_RENDERED_ATTR, 'true')
      } catch {
        const error = document.createElement('p')
        error.className = 'my-5 text-sm text-error'
        error.setAttribute('data-mermaid-generated', 'true')
        error.textContent = 'Could not render Mermaid diagram. Check the diagram syntax.'
        pre.after(error)
        pre.setAttribute(MERMAID_RENDERED_ATTR, 'true')
      }
    }
  }

  const scheduleRender = () => {
    if (pending) return
    pending = true

    queueMicrotask(async () => {
      pending = false
      cleanupRenderedBlocks()
      await renderMermaidBlocks()
    })
  }

  const watchThemeChanges = () => {
    if (htmlClassObserver) {
      htmlClassObserver.disconnect()
    }

    htmlClassObserver = new MutationObserver((mutations) => {
      const classChanged = mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')
      if (classChanged) {
        scheduleRender()
      }
    })

    htmlClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  onNuxtReady(() => {
    watchThemeChanges()
    scheduleRender()
  })

  nuxtApp.hook('page:finish', () => {
    scheduleRender()
  })
})
