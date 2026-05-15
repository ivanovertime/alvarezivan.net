<script setup lang="ts">
import type { HomeCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: HomeCollectionItem
}>()

const items = computed(() => {
  return props.page.faq?.categories.map((faq) => {
    return {
      label: faq.title,
      key: faq.title.toLowerCase(),
      questions: faq.questions
    }
  })
})

const ui = {
  root: 'flex items-center gap-4 w-full',
  list: 'relative flex bg-transparent dark:bg-transparent gap-2 px-0',
  indicator: 'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
  trigger: 'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
  label: 'whitespace-normal break-words text-left'
}
</script>

<template>
  <UPageSection
    v-if="page.faq?.categories?.length"
    :title="page.faq.title"
    :ui="{
      container: 'px-0 !pt-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <template
      v-if="page.faq.description"
      #description
    >
      <MDC
        :value="page.faq.description"
        unwrap="p"
      />
    </template>
    <UTabs
      :items
      orientation="horizontal"
      :ui
    >
      <template #content="{ item, index }">
        <Motion
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UAccordion
            trailing-icon="lucide:plus"
            :items="item.questions"
            :unmount-on-hide="false"
            :ui="{
              item: 'border-none',
              trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
              trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted'
            }"
          >
            <template #body="{ item: _item }">
              <MDC
                :value="_item.content"
                unwrap="p"
                class="px-4"
              />
            </template>
          </UAccordion>
        </Motion>
      </template>
    </UTabs>
  </UPageSection>
</template>
