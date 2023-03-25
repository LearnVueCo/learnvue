<script setup lang="ts">
import { Content } from '~~/utils/content'

const props = defineProps<{
  slug: string
}>()

const { data, error } = await useAsyncData(
  `article-callout-${props.slug}`,
  () => {
    return queryContent<Content>(props.slug).without('body, excerpt').findOne()
  }
)

// example usage: :article-callout{slug='/tutorials/vuex-in-vue-3'}
</script>

<template>
  <NuxtLink
    v-if="!error && data"
    class="shadow-hover block rounded-lg border-2 p-4 hover:border-green not-prose"
    :to="data._path"
  >
    <h4 class="text-base opacity-60">Related Article:</h4>
    <h3 class="text-lg font-bold">{{ data.title }}</h3>
    <p class="mt-2 text-sm opacity-60">{{ data.description }}</p>
  </NuxtLink>
</template>
