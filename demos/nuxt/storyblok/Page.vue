<script setup lang="ts">
defineProps<{
  blok: any
}>()
</script>

<template>
  <StoryblokComponent v-for="b in blok.body" :blok="b" />
</template>
