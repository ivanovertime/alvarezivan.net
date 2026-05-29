<script setup lang="ts">
const props = defineProps<{
  code?: string
}>()

const slots = useSlots()
const colorMode = useColorMode()
const diagramRoot = ref<HTMLElement | null>(null)

const svg = ref('')
const errorMessage = ref('')
const source = ref('')

const mermaidTheme = computed(() => colorMode.value === 'dark' ? 'dark' : 'default')

const extractText = (node: unknown): string => {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')

  if (node && typeof node === 'object' && 'children' in node) {
    return extractText((node as { children?: unknown }).children)
  }

  return ''
}

watchEffect(() => {
  const slotText = extractText(slots.default?.())
  source.value = (props.code ?? slotText).replace(/\u00A0/g, ' ').trim()
})

const renderMermaid = async () => {
  if (!source.value) {
    svg.value = ''
    errorMessage.value = ''
    return
  }

  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: mermaidTheme.value
    })

    const id = `mermaid-${Date.now()}-${Math.round(Math.random() * 100000)}`
    const result = await mermaid.render(id, source.value)
    svg.value = result.svg
    errorMessage.value = ''
  } catch {
    svg.value = ''
    errorMessage.value = 'Could not render Mermaid diagram. Check the diagram syntax.'
  }
}

watch([source, mermaidTheme], () => {
  void renderMermaid()
}, { immediate: true })

watch(svg, (value) => {
  if (diagramRoot.value) {
    diagramRoot.value.innerHTML = value
  }
}, { immediate: true })
</script>

<template>
  <ClientOnly>
    <figure class="my-6 rounded-lg border border-default p-4 bg-elevated/40">
      <div
        v-if="errorMessage"
        class="text-sm text-error"
      >
        {{ errorMessage }}
      </div>
      <div
        v-else-if="svg"
        ref="diagramRoot"
        class="mermaid-diagram overflow-x-auto"
      />
    </figure>

    <template #fallback>
      <figure class="my-6 rounded-lg border border-default p-4 bg-elevated/40 text-sm text-muted">
        Rendering Mermaid diagram...
      </figure>
    </template>
  </ClientOnly>
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: 100%;
}
</style>
