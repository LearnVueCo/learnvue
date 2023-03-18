<template>
  <div
    class="custom-block text-highlight mb-8 rounded-lg border-2 border-green p-4"
  >
    <slot />
  </div>
</template>

<style scoped>
:deep(a) {
  @apply underline !important;
}
</style>
