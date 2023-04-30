<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number
    name: string
    description: string
    thumbnail: string
  }
}>()

let image = ref<HTMLImageElement>()
const active = useState()

function handleClick(e: MouseEvent) {
  active.value = props.product.id
}
</script>

<template>
  <NuxtLink
    class="bg-gray-900 rounded-lg relative"
    :to="`/product/${product.id}`"
    @click="handleClick"
    :class="{
      active: active === product.id
    }"
  >
    <div class="relative">
      <img :src="product.thumbnail" class="rounded-lg" ref="image" />
      <div
        class="label absolute bottom-4 right-4 rounded-lg py-1 px-2 text-sm font-medium bg-purple-500"
      >
        Trending
      </div>
    </div>
    <div class="p-8">
      <p class="font-bold text-xl">{{ product.name }}</p>
      <p>{{ product.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.active img {
  view-transition-name: selected-image;
}

.active .label {
  view-transition-name: selected-label;
}
</style>
