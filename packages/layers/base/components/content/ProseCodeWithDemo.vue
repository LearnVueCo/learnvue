<script setup lang="ts">
withDefaults(
  defineProps<{
    demoTitle?: string
  }>(),
  {
    demoTitle: 'Preview'
  }
)
</script>

<template>
  <div class="relative grid grid-cols-2 gap-4 text-base">
    <div class="col-span-2 rounded bg-default lg:col-span-1">
      <slot name="code" />
    </div>
    <div
      class="bg-default col-span-2 w-full overflow-hidden rounded border border-gray-300 dark:border-charcoal-600 lg:col-span-1"
    >
      <div
        class="relative z-50 flex items-center bg-gray-100 py-2 pl-2 dark:bg-white dark:bg-opacity-10"
      >
        <div class="absolute left-2 h-2 w-2 rounded-full bg-red-500" />
        <div class="absolute left-5 h-2 w-2 rounded-full bg-yellow-500" />
        <div class="absolute left-8 h-2 w-2 rounded-full bg-green" />

        <div class="text-highlight relative mx-auto">
          {{ demoTitle }}
        </div>
      </div>
      <div class="p-8 max-h-[500px]">
        <slot name="demo" />
      </div>
    </div>
  </div>
</template>
