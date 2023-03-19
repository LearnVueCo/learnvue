<script setup lang="ts">
const { locale, locales } = useI18n()
const { params } = useRoute()
const story = await useAsyncStoryblok(`blog/${params.slug}`, {
  version: 'draft',
  language: locale.value
})

useServerSeoMeta({
  title: () => story.value.content.metadata.title,
  ogTitle: () => story.value.content.metadata.title,
  description: () => story.value.content.metadata.description,
  ogDescription: () => story.value.content.metadata.description
})

defineOgImageStatic({
  component: 'OgTemplate',
  title: story.value.content.metadata.title,
  description: story.value.content.metadata.description,
  authorName: story.value.content.author,
  authorImg: story.value.content.authorImage.filename
})

const articleContent = computed(() => renderRichText(story.value.content.body))
</script>

<template>
  <article
    v-editable="story.content"
    class="container mx-auto prose prose-invert max-w-2xl"
  >
    <h1
      class="text-white text-3xl font-black mb-8 pb-2 border-b-2 border-white border-opacity-50"
    >
      {{ story.content.title }}
    </h1>
    <div v-html="articleContent"></div>
  </article>
</template>
