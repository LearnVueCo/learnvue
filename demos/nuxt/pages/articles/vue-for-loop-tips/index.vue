<script setup lang="ts">
import { ref } from 'vue'
const products = ref([
  { id: 0, name: 'shirt' },
  { id: 1, name: 'jacket' },
  { id: 2, name: 'shoes' }
])
</script>

<template>
  <div class="text-highlight">
    <div v-for="(product, index) in products" :key="product.id">
      #{{ index + 1 }} - {{ product.name }}
    </div>
  </div>
</template>
