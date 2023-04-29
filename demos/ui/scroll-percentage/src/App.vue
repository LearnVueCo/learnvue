<script setup lang="ts">
import DummyContent from './components/DummyContent.vue'
import { ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
const el = ref<HTMLElement | null>(null)
const { y } = useWindowScroll()

const scrollPercent = ref(0)

watch(y, () => {
  if (!el.value) return
  // will be 100% when the bottom of the article is at the top of the screen, we can offset by whatever depending on your layout
  const bottomOfArticle = el.value.getBoundingClientRect().height
  const percent = Math.abs(y.value / bottomOfArticle)
  scrollPercent.value = Math.min(100, percent * 100)
})
</script>

<template>
  <div>
    <header
      class="h-16 flex items-center justify-between sticky top-0 z-50 bg-black px-8"
    >
      <span class="font-bold">LearnVue</span>
      <span>{{ scrollPercent.toFixed(2) }}%</span>
      <div
        class="absolute bottom-0 w-full bg-gray-950 h-1 left-0"
        data-id="track"
      >
        <div
          class="absolute bg-gradient-to-r from-green-500 to-blue-500 bg-[length:100vw] top-0 left-0 h-full"
          :style="{
            width: `${scrollPercent}%`
          }"
          data-notes="needs length:100vw so the background is also the screen width regardless of element width"
        />
      </div>
    </header>

    <article class="mt-4 mb-[100vh]" ref="el">
      <DummyContent />
    </article>
  </div>
</template>

<style scoped></style>
