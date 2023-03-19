<script setup lang="ts">
defineProps<{
  blok: any
}>()
</script>

<template>
  <div
    v-editable="blok"
    class="p-8 rounded-lg transition-all duration-300 hover:-translate-y-1"
    :class="{
      'border-2 border-green text-white hover:bg-green':
        blok.color === 'green' || !blok.color,
      'border-2 border-blue-500 text-white hover:bg-blue-500':
        blok.color === 'blue',
      'border-2 border-red-500 text-white hover:bg-red-500':
        blok.color === 'red'
    }"
  >
    <h2 class="text-xl font-bold">{{ blok.header }}</h2>
    <p>{{ blok.description }}</p>
  </div>
</template>
