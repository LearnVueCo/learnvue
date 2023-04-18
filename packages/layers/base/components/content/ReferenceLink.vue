<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    src: string
    title?: string
  }>(),
  {
    icon: 'ri:link',
    title: undefined
  }
)
</script>
<template>
  <NuxtLink
    :to="src"
    class="not-prose mt-4 flex items-center rounded-lg border-2 px-4 pt-4 pb-2 leading-normal hover:border-green no-underline"
  >
    <Icon :name="icon" class="mr-2 shrink-0 text-2xl" />
    <div class="mb-2">
      <p v-if="title" class="text-xs opacity-60">{{ src }}</p>
      <p class="text-highlight text-base font-medium">{{ title ?? src }}</p>
    </div>
  </NuxtLink>
</template>
