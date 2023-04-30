<script setup lang="ts">
import data from '~/data.json'

const route = useRoute()

const id = route.params.id

const product = data.find((p) => p.id === Number(id))
</script>

<template>
  <div v-if="product" class="grid grid-cols-12 gap-8">
    <img
      class="col-span-7 rounded-lg"
      :src="product?.thumbnail"
      :style="{
        // @ts-expect-error
        viewTransitionName: 'selected-image'
      }"
    />
    <div class="col-span-5">
      <h1 class="text-5xl font-black">{{ product.name }}</h1>
      <div class="flex mt-2 mb-8">
        <div
          class="label rounded-lg py-1 px-2 text-sm font-medium bg-purple-500"
          :style="{
            // @ts-expect-error
            viewTransitionName: 'selected-label'
          }"
        >
          Trending
        </div>
      </div>
      <p class="text-xl">{{ product.description }}</p>
    </div>
  </div>
</template>
