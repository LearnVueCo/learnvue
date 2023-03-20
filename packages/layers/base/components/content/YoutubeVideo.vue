<script setup lang="ts">
defineProps<{
  url: string
}>()

function getYouTubeIdFromUrl(videoUrl: string) {
  if (videoUrl.includes('/v')) {
    return videoUrl.split('/v/')[1]
  } else if (videoUrl.includes('?v=')) {
    // format: https://www.youtube.com/watch?v=2fuENUWU7Vk
    return videoUrl.split('v=')[1]
  } else if (
    videoUrl.includes('youtu.be/') ||
    videoUrl.includes('youtube.com/embed/') ||
    videoUrl.includes('youtube-nocookie.com/embed/')
  ) {
    // format: youtu.be/2fuENUWU7Vk
    return videoUrl.split('/').pop()
  }
  throw new Error('Not a valid YouTube URL')
}

function getYouTubeEmbedUrl(videoUrl: string) {
  const id = getYouTubeIdFromUrl(videoUrl)
  return `https://www.youtube-nocookie.com/embed/${id}`
}
</script>

<template>
  <div>
    <iframe
      :src="getYouTubeEmbedUrl(url)"
      class="shadow-hover mx-auto mt-8 aspect-video w-full max-w-lg rounded-lg"
    />
  </div>
</template>
