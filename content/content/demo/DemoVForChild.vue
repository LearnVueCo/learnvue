<script setup lang="ts">
import { ref } from 'vue'
withDefaults(
  defineProps<{
    product: {
      name: string
      price: number
    }
  }>(),
  {
    product: () => ({
      name: 'Product',
      price: 100,
    }),
  }
)

const quantity = ref(0)
</script>

<template>
  <div class="mb-1 flex">
    {{ product.name }}

    <button
      class="ml-auto w-32 rounded bg-green text-white"
      @click="quantity++"
    >
      Quantity: {{ quantity }}
    </button>
  </div>
</template>
