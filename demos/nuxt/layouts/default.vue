<script setup lang="ts">
const route = useRoute()

const isEmbed = computed(() => route.query.embed === 'embed')
const isDark = computed(() => route.query.mode === 'dark')
</script>
<template>
  <div
    :class="{
      dark: isEmbed && isDark
    }"
  >
    <div class="min-h-screen text-default bg-default">
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
  </div>
</template>
