<script setup lang="ts">
import { ref } from 'vue'
import { TransitionPresets } from '@vueuse/core'
const count = ref(0)

const uppercase = ref()

const animatedMessages = ref<string[]>([])
const startEl = ref<HTMLElement>()
const targetEl = ref<HTMLElement>()
const { x, y, top, right, bottom, left, width, height } =
  useElementBounding(startEl)
const {
  x: targetX,
  y: targetY,
  top: targetTop,
  left: targetLeft,
  width: targetWidth,
  height: targetHeight
} = useElementBounding(targetEl)
const start = computed(() => {
  return {
    x: left.value + width.value - 100,
    y: top.value
  }
})

const target = computed(() => {
  return {
    x: targetLeft.value + 80,
    y: targetTop.value
  }
})

function handleAdd(i: number) {
  animatedMessages.value.push(`add(${i})`)
}
</script>
<template>
  <div>
    <AnimatedBlock
      v-for="message in animatedMessages"
      :key="message"
      :start="start"
      :target="target"
      :duration="2500"
      v-slot="{ styles }"
    >
      <div
        :style="styles"
        class="absolute p-1 rounded-lg bg-green-800 text-sm left-0 top-0 z-20 text-white"
      >
        {{ message }}
      </div></AnimatedBlock
    >
    <div
      class="relative mt-4 rounded border-2 border-red-500 px-4 py-8 text-center"
      ref="targetEl"
    >
      <div
        class="absolute top-0 left-0 rounded-br bg-red-500 p-1 text-sm text-white"
      >
        Parent.vue
      </div>
      <DemoEmitBasicChild
        ref="startEl"
        @add="handleAdd"
        class="relative mx-auto flex max-w-sm flex-col rounded border-2 border-blue p-4"
      />
      <p>Count: {{ count }}</p>
    </div>
    <VueEmitTextInput @custom-change="uppercase = $event" />
    Uppercase: {{ uppercase }}
  </div>
</template>
