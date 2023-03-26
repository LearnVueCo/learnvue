<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<template>
  <div
    class="text-highlight rounded-lg border-2 border-yellow-500 p-4 not-prose"
  >
    <p v-if="title" class="font-bold">{{ title }}</p>
    <slot />
  </div>
</template>

<style scoped>
:deep(a) {
  @apply underline !important;
}
</style>
