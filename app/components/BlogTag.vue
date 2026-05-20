<script setup lang="ts">
defineProps<{
  tag: string
  size?: 'xs' | 'sm' | 'md'
  variant?: 'soft' | 'subtle' | 'outline' | 'solid'
}>()
</script>

<template>
  <UBadge
    color="neutral"
    :variant="variant ?? 'soft'"
    :size="size ?? 'sm'"
    class="font-mono"
  >
    <template #leading>
      <UIcon
        name="i-lucide-tag"
        class="size-3"
      />
    </template>
    {{ tag }}
  </UBadge>
</template>
