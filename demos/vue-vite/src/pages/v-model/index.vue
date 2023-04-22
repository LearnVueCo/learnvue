<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import basic from './components/basic.vue'
import lazy from './components/lazy.vue'
import number from './components/number.vue'
import trim from './components/trim.vue'
import custom from './components/custom.vue'
const route = useRoute()

const currentComponent = computed(() => {
  switch (route.query?.component) {
    case 'basic':
      return basic
    case 'lazy':
      return lazy
    case 'number':
      return number
    case 'trim':
      return trim
    case 'custom':
      return custom
    default:
      return basic
  }
})
</script>

<template>
  <component :is="currentComponent" />
</template>
