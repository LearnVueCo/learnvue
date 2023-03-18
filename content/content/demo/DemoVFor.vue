<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  step?: Number
}>()

const products = ref([
  { id: 0, name: 'shirt' },
  { id: 1, name: 'jacket' },
  { id: 2, name: 'shoes' },
])

const submitted = ref(false)
const reorder = () => {
  submitted.value = true
  products.value = [products.value[1], products.value[2], products.value[0]]
}
</script>
<template>
  <button
    v-if="step && step >= 1"
    class="mb-4 rounded bg-green px-2 py-1 text-white"
    @click="reorder"
  >
    Reorder
  </button>
  <div id="#hello">
    <!-- more elements -->
  </div>
  <div v-if="step === 3">
    <DemoVForChild
      v-for="product in products"
      :key="product.id"
      :product="(product as any)"
    />
  </div>
  <template v-else-if="step === 2">
    <div
      v-for="product in products"
      :key="product.id"
      class="mb-2 flex w-full items-center"
    >
      {{ product.name }}
      <input
        type="number"
        placeholder="Quantity"
        class="ml-auto w-48 border p-2"
      />
    </div>
  </template>
  <template v-else-if="step === 1">
    <div
      v-for="product in products"
      :key="product.id"
      class="mb-2 flex w-full items-center"
    >
      {{ product.name }}
      <input
        type="number"
        placeholder="Quantity"
        class="ml-auto w-48 border p-2"
      />
    </div>
  </template>
  <template v-else>
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </template>
  <template v-if="step === 1">
    <p class="mt-8 text-sm">
      Try typing a quantity, hitting reorder, and see what happens.
    </p>
    <p v-if="submitted" class="mt-2 rounded bg-green bg-opacity-50 p-2 text-sm">
      Our elements are patched in place, so the input doesn't move!
    </p>
  </template>
  <template v-if="step === 2">
    <p class="mt-8 text-sm">
      Try typing a quantity, hitting reorder, and see what happens.
    </p>
    <p v-if="submitted" class="mt-2 rounded bg-green bg-opacity-50 p-2 text-sm">
      Our vnodes have a key, so elements are reordered!
    </p>
  </template>
</template>
