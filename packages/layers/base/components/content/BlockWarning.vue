<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<template>
  <div
    class="text-highlight rounded-lg border-2 border-yellow-500 bg-yellow-500 bg-opacity-70 p-4 text-opacity-70"
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
