<script setup lang="ts">
const { locale } = useI18n()
// pull page from storyblok
const story = await useAsyncStoryblok('landing/concerts', {
  version: 'draft',
  language: locale.value
})
</script>

<template>
  <div>
    <!-- render out our page using the built-in StoryblokComponent resolver -->
    <Test />
    <StoryblokComponent :blok="story.content" />
  </div>
</template>
