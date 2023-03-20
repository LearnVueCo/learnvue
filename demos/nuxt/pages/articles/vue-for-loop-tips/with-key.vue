<script setup lang="ts">
import { ref } from 'vue'
const products = ref([
  { id: 0, name: 'shirt' },
  { id: 1, name: 'jacket' },
  { id: 2, name: 'shoes' }
])

const changed = ref(false)

function reorder() {
  // shift products upwards
  products.value = [products.value[1], products.value[2], products.value[0]]
  changed.value = true
}
const example = ref<HTMLDivElement>()
onMounted(() => {
  if (example.value && example.value.querySelector('input')) {
    example.value.querySelector('input')!.value = '50'
  }
})
</script>
<template>
  <div ref="example">
    <button class="mb-4 rounded bg-green px-2 py-1 text-white" @click="reorder">
      Reorder
    </button>
    <div
      v-for="(product, index) in products"
      :key="product.id"
      class="mb-2 flex w-full items-center"
    >
      {{ product.name }}
      <input
        type="number"
        placeholder="Quantity"
        class="ml-auto w-48 border p-2 bg-transparent"
      />
    </div>
    <div v-if="changed" class="rounded p-4 bg-green bg-opacity-30">
      <p>
        Since we're giving our v-for a key, Vue treats the each div in our v-for
        as an entire item - so when we reorder, the input elements are moving!
      </p>
    </div>
  </div>
</template>
