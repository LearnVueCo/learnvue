<script setup lang="ts">
defineProps<{
  twitter?: String
  facebook?: String
  linkedin?: String
  email?: String
  youtube?: String
}>()
</script>

<template>
  {{ twitter }}
</template>
