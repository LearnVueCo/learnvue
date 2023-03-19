<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    type?: 'nuxt' | 'vue-vite'
    windowed?: boolean
  }>(),
  {
    type: 'nuxt',
    windowed: true
  }
)

const iFrameSrc = computed(() => {
  let basePath = ''
  if (process.dev) {
    if (props.type === 'nuxt') {
      basePath = 'http://localhost:8086'
    } else {
      basePath = 'http://localhost:8085'
    }
  } else {
    basePath = `https://demo.learnvue.co/${props.type}`
  }
  return `${basePath}${props.src}?embed=embed`
})
</script>
<template>
  <div class="aspect-video w-full overflow-hidden rounded-xl border-2">
    <div
      v-if="windowed"
      class="relative z-20 flex h-8 items-center bg-gray-100 pl-2 dark:bg-white dark:bg-opacity-10"
    >
      <div class="absolute left-2 h-2 w-2 rounded-full bg-red-500" />
      <div class="absolute left-5 h-2 w-2 rounded-full bg-yellow-500" />
      <div class="absolute left-8 h-2 w-2 rounded-full bg-green" />

      <div class="relative mx-auto text-sm">
        {{ 'Live Demo' }}
      </div>
    </div>
    <iframe :src="iFrameSrc" class="h-full w-full" />
  </div>
</template>
