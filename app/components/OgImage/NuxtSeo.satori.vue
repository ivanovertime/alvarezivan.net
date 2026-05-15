<script setup lang="ts">
defineProps({
  title: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  siteName: { type: String, required: false, default: 'Ivan Over Time' }
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between relative p-16 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
  >
    <!-- Subtle gradient accent (top-right) -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      :style="{
        backgroundImage: 'radial-gradient(ellipse 80% 80% at 100% 0%, rgba(34, 197, 94, 0.18) 0%, transparent 60%)'
      }"
    />
    <!-- Subtle gradient accent (bottom-left) -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      :style="{
        backgroundImage: 'radial-gradient(ellipse 60% 60% at 0% 100%, rgba(34, 197, 94, 0.12) 0%, transparent 60%)'
      }"
    />

    <!-- Top: site mark -->
    <div class="flex items-center justify-start relative">
      <span class="text-[28px] font-semibold tracking-tight opacity-80">
        {{ siteName }}
      </span>
    </div>

    <!-- Middle: title + description -->
    <div class="flex flex-col justify-center relative gap-6">
      <h1
        class="text-[68px] font-bold leading-[1.05] m-0 tracking-tight"
        style="display: block; line-clamp: 3; text-overflow: ellipsis; text-wrap: balance;"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="text-[28px] opacity-70 leading-snug max-w-[1000px] m-0"
        style="display: block; line-clamp: 3; text-overflow: ellipsis;"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom: byline -->
    <div class="flex items-center justify-between relative">
      <span class="text-[22px] opacity-60">
        Iván Álvarez · Full-Stack Engineer
      </span>
      <span class="text-[22px] opacity-60">
        alvarezivan.net
      </span>
    </div>
  </div>
</template>
