<script setup lang="ts">
defineProps<{
  demo: string
  header?: string
  subheader?: string
  browserTitle?: string
  size?: string
  demoProps?: object
}>()
</script>
<template>
  <div class="demo custom-block w-full rounded-lg py-8 px-8">
    <header v-if="header" class="py-12">
      <h2 class="mb-4 text-center text-3xl">
        {{ header }}
      </h2>
      <p v-if="subheader" class="text-center">
        {{ subheader }}
      </p>
    </header>
    <div
      class="shadow-default-xl bg-default mx-8 overflow-hidden rounded-lg border-2"
    >
      <div
        class="relative z-20 flex h-8 items-center bg-gray-100 pl-2 dark:bg-white dark:bg-opacity-10"
      >
        <div class="absolute left-2 h-2 w-2 rounded-full bg-red-500" />
        <div class="absolute left-5 h-2 w-2 rounded-full bg-yellow-500" />
        <div class="absolute left-8 h-2 w-2 rounded-full bg-green" />

        <div class="relative mx-auto">
          {{ browserTitle ?? 'Live Demo' }}
        </div>
      </div>
      <div class="relative mt-0 h-0 px-8 pb-[100%] md:pb-[56.25%]">
        <div
          class="absolute top-0 left-0 flex h-full w-full flex-col overflow-auto"
        >
          <component :is="demo" :p="demoProps ?? {}" />
        </div>
      </div>
    </div>
  </div>
</template>
