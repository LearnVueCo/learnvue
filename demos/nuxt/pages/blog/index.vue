<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <NuxtLink :to="localePath('/blog/my-theme')">my-theme</NuxtLink>
</template>
