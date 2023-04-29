<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'
import LearnVueLogo from './components/LearnVueLogo.vue'
// nuxt source for loading screen
// https://github.com/nuxt/assets/blob/main/packages/templates/templates/loading/index.html
// they can't use Vue because it's during the preload so it has to be shipped as pure...
// so we can say our code is "better" 😎

// steps:
// 1. get mouse position + control a div's position
// 2. get distance from center + control a div's size/opacity
// 3. determine mask position using mouse position

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const logo = ref<HTMLElement>()

// TODO: refactor so it's a single computed function - that's how I would do it...

// is there a cleaner way to get the distance + size?
const dx = computed(() => Math.abs(x.value - width.value / 2))
const dy = computed(() => Math.abs(y.value - height.value / 2))
const size = computed(() =>
  Math.max(500 - Math.sqrt(dx.value * dx.value + dy.value * dy.value) / 2, 150)
)

const opacity = computed(() => Math.min(Math.max(size.value / 500, 0.7), 1))

// why is this necessary? why do we need to subtract the bounding rect?`
// subtracting the bound rect is necessary because the gradient is relative to the element
// the default (0, 0) is the top left corner of the element
// so we need to subtract the element's position from the mouse position to get the gradient to be centered on the mouse.
const logoPosition = computed(() => ({
  x: x.value - (logo.value?.getBoundingClientRect().left ?? 0),
  y: y.value - (logo.value?.getBoundingClientRect().top ?? 0)
}))

// what's the default behavior of radial-gradient? size-wise?
const logoGradient = computed(
  () =>
    `radial-gradient(circle at ${logoPosition.value.x}px ${logoPosition.value.y}px, black 30%, transparent 100%)`
)

// extensions:
// add a loading bar (if this is a splash screen like Nuxt)
// add easing functions to the mouse x/y positions (can make it look more interesting)
</script>

<template>
  <div
    class="p-8 relative flex items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-b from-80% from-black to-green-500/30"
  >
    <div
      class="bg-green-500/30 rounded-full blur-2xl opacity-50 absolute -translate-x-1/2 -translate-y-1/2 animate-pulse pointer-events-none mouse-light"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity
      }"
    />
    <a href="https://learnvue.co" target="_blank" ref="logo">
      <LearnVueLogo
        :style="{
          '-webkit-mask-image': logoGradient,
          maskImage: logoGradient
        }"
      />
    </a>
  </div>
</template>

<style scoped>
/* Alternative to using inline styles */
.mouse-light {
  /* needs the quote syntax to pass a JS Expression */
  left: v-bind('x + "px"');
  top: v-bind('y + "px"');
  width: v-bind('size + "px"');
  height: v-bind('size + "px"');
  opacity: v-bind(opacity);
}
</style>
