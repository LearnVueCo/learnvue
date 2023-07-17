<script setup lang="ts">
import { useRoute, definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: 'User'
  }
})

const route = useRoute('/user/[id]')
console.log(route.params.id)
</script>

<template></template>
