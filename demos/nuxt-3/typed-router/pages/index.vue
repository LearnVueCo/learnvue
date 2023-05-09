<script setup lang="ts">
const props = defineProps<{}>()

function submit() {
  navigateTo({
    name: 'blog-slug',
    params: {
      slug: 'hello-world'
    }
  })
}
</script>
<template>
  <button @click="submit">submit</button>
  <NuxtLink to="/blog"> Blog </NuxtLink>
  <NuxtLink to="https://learnvue.co" :external="true"> LearnVue </NuxtLink>
</template>
