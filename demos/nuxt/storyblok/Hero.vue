<script setup lang="ts">
defineProps<{
  blok: any
}>()
</script>

<template>
  <div
    v-editable="blok"
    class="aspect-[3/1] bg-cover bg-right rounded-lg p-16 relative overflow-hidden"
    :style="{
      backgroundImage: `url('${blok.backgroundImg.filename}')`
    }"
  >
    <div
      class="absolute inset-0 w-full h-full bg-gradient-to-tl from-sky-800 to-black opacity-70 z-10"
    />
    <div
      class="absolute inset-0 w-full h-full p-16 z-20 md:w-1/2"
      :class="{
        'md:mx-auto text-center': blok.alignment === 'center'
      }"
    >
      <h1 class="text-white font-black text-5xl">{{ blok.header }}</h1>
      <p class="mt-4 text-lg text-white font-medium">{{ blok.description }}</p>
      <NuxtLink
        :to="blok.link"
        class="px-4 py-2 rounded bg-blue-500 font-bold text-white mt-16 inline-block"
      >
        {{ blok.callToAction }}</NuxtLink
      >
    </div>
  </div>
</template>
