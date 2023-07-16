<script setup lang="ts">
import { useRoute } from 'vue-router/auto'

const route = useRoute('/user/[id]')

console.log(route.params.id)
</script>
<template>
  <div>User {{ route.params.id }}</div>
</template>
