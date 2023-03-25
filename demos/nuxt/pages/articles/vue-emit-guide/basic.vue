<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <div
    class="relative mx-8 mt-4 rounded border border-red-500 px-4 py-8 text-center"
  >
    <div
      class="absolute top-0 left-0 rounded-br bg-red-500 p-1 text-sm text-white"
    >
      Parent.vue
    </div>
    <BasicChild @add="(i) => (count += i)" />
    <p>Count: {{ count }}</p>
  </div>
</template>
