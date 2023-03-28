<template>
  <figure class="relative">
    <slot name="img" />
    <figcaption class="w-full text-sm text-center not-prose">
      <slot name="caption" />
    </figcaption>
  </figure>
</template>

<style scoped>
:slotted(:deep(img)) {
  @apply mb-0 !important;
}

:slotted(:deep(a)) {
  @apply underline hover:text-charcoal-900 dark:hover:text-white !important;
}
</style>
