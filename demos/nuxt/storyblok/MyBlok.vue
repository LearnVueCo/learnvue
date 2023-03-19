<script setup lang="ts">
defineProps<{
  blok: any
}>()
</script>

<template>
  <h1>{{ blok.header }}</h1>
  <p>{{ blok.description }}</p>
</template>
