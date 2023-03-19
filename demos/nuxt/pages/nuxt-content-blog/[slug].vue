<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(`content-${route.path}`, () =>
  queryContent().where({ _path: route.path }).findOne()
)
</script>

<template>
  <main>
    <ContentRenderer :value="data" />
  </main>
</template>

<style scoped>
main {
  @apply pt-7;
}
main :deep(h1) {
  @apply text-white text-2xl mb-8 font-extrabold;
}
main div > :deep(p) {
  @apply mb-2;
}
main :deep(pre) {
  @apply bg-gray-800 p-4 rounded;
}
</style>
