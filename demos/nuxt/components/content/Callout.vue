<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="flex items-center p-4 mb-4 border-2 border-green-400 rounded">
    <div class="p-2 mr-4 bg-green-400 rounded-full">
      <img :src="icon" />
    </div>
    <ContentSlot :use="$slots.default" />
  </div>
</template>

<ContentSlot :use="$slots.body" />
