<script setup lang="ts">
const props = defineProps<{
  pillar: string
  size?: 'xs' | 'sm' | 'md'
  variant?: 'soft' | 'subtle' | 'outline' | 'solid'
}>()

type PillarStyle = {
  color: 'primary' | 'info' | 'success' | 'warning' | 'neutral'
  icon: string
}

const PILLAR_MAP: Record<string, PillarStyle> = {
  'Platform & DevOps': { color: 'primary', icon: 'i-lucide-cloud' },
  'GCP & DataOps': { color: 'info', icon: 'i-lucide-database' },
  'Full-Stack Architecture': { color: 'success', icon: 'i-lucide-layers' },
  'AI-Augmented': { color: 'warning', icon: 'i-lucide-sparkles' },
  'Side Project': { color: 'neutral', icon: 'i-lucide-flask-conical' }
}

const meta = computed<PillarStyle>(() => PILLAR_MAP[props.pillar] ?? { color: 'neutral', icon: 'i-lucide-tag' })
</script>

<template>
  <UBadge
    :color="meta.color"
    :variant="variant ?? 'soft'"
    :size="size ?? 'sm'"
    class="font-mono"
  >
    <template #leading>
      <UIcon
        :name="meta.icon"
        class="size-3"
      />
    </template>
    {{ pillar }}
  </UBadge>
</template>
