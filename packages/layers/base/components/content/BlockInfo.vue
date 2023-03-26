<template>
  <div
    class="text-highlight mb-8 rounded-lg border-2 border-green p-4 not-prose"
  >
    <slot />
  </div>
</template>

<style scoped>
:deep(a) {
  @apply underline !important;
}
</style>
