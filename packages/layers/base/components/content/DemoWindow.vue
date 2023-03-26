<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    type?: 'nuxt' | 'vite'
    windowed?: boolean
  }>(),
  {
    type: 'nuxt',
    windowed: true
  }
)

const colorMode = useColorMode()

const iFrameSrc = computed(() => {
  let basePath = ''
  if (process.dev) {
    if (props.type === 'nuxt') {
      basePath = 'http://localhost:8086'
    } else {
      basePath = 'http://localhost:8085'
    }
  } else {
    basePath = `https://demo-${props.type}.learnvue.co`
  }
  return `${basePath}${props.src}?embed=embed&mode=${colorMode.preference}`
})
</script>
<template>
  <div
    class="aspect-video w-full overflow-hidden rounded-xl border-2 not-prose mt-8"
  >
    <div
      v-if="windowed"
      class="relative z-20 flex h-8 items-center pl-2 bg-background"
    >
      <div class="absolute left-2 h-2 w-2 rounded-full bg-red-500" />
      <div class="absolute left-5 h-2 w-2 rounded-full bg-yellow-500" />
      <div class="absolute left-8 h-2 w-2 rounded-full bg-green" />

      <div class="relative mx-auto text-sm">Demo</div>
    </div>
    <iframe :src="iFrameSrc" class="h-full w-full" />
  </div>
</template>
