<script setup lang="ts">
defineProps<{
  blok: any
}>()

const categories = ['sports', 'music', 'theatre', 'film', 'art', 'food']

const { locale } = useI18n()
</script>
<template>
  <div
    v-editable="blok"
    class="grid grid-cols-3 md:px-36 gap-24 mt-8"
    v-if="blok.locale.includes(locale)"
  >
    <div
      class="col-span-3 md:col-span-1 capitalize text-center text-white font-medium"
      v-for="category in categories"
      :key="category"
    >
      <NuxtLink
        class="px-4 py-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors"
      >
        {{ category }}
      </NuxtLink>
    </div>
  </div>
</template>
