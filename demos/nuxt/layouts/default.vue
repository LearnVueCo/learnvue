<script setup lang="ts">
const route = useRoute()

const isEmbed = computed(() => route.query.embed === 'embed')
</script>
<template>
  <div class="min-h-screen bg-charcoal text-charcoal-100">
    <OgImageStatic />

    <SiteHeader v-if="!isEmbed" />
    <div
      class="container mx-auto"
      :class="{
        'pt-4': isEmbed
      }"
    >
      <slot />
    </div>
  </div>
</template>
