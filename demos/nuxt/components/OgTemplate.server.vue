<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
  authorName: String,
  authorImg: String
})
</script>

<template>
  <div
    class="relative w-full h-full flex flex-col from-gray-900 to-black text-white items-center justify-center"
    :style="{
      backgroundImage:
        'radial-gradient(circle at center, var(--tw-gradient-stops))'
    }"
  >
    <h1
      :style="{ fontSize: '70px' }"
      class="text-center text-transparent text-8xl bg-clip-text bg-gradient-to-r from-[#15CA82] to-[#47CFFF]"
    >
      {{ title }}
    </h1>
    <p class="text-3xl">{{ description }}</p>
    <div class="flex items-center absolute bottom-4 right-4">
      <img :src="authorImg" class="rounded-full h-12 w-12 mr-4 object-cover" />
      <p class="text-xl">{{ authorName }}</p>
    </div>
  </div>
</template>
