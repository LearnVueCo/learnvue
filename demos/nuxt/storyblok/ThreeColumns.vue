<script setup lang="ts">
defineProps<{
  blok: any
}>()
</script>

<template>
  <div class="grid grid-cols-3 mt-16 gap-8" v-editable="blok">
    <StoryblokComponent :blok="blok.left[0]" class="col-span-3 md:col-span-1" />

    <StoryblokComponent
      :blok="blok.middle[0]"
      class="col-span-3 md:col-span-1"
    />

    <StoryblokComponent
      :blok="blok.right[0]"
      class="col-span-3 md:col-span-1"
    />
  </div>
</template>
