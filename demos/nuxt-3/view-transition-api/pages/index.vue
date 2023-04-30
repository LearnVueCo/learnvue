<script setup lang="ts">
import data from '~/data.json'
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <div class="grid grid-cols-12 gap-8">
      <Card
        v-for="product in data"
        :key="product.id"
        :product="product"
        class="col-span-4"
      />
    </div>
  </div>
</template>

<style scoped>
.thumbnail {
  view-transition-name: full-embed;
}
</style>
