<script setup lang="ts">
import { TransitionPresets } from '@vueuse/core'

const props = defineProps<{
  start: { x: number; y: number }
  target: { x: number; y: number }
  duration: number
}>()

const source = ref([props.start.x, props.start.y])

const output = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets.linear
})

const coordinates = computed(() => {
  const [x, y] = output.value
  return {
    x,
    y
  }
})

const sourceOpacity = ref(1)
const opacity = useTransition(sourceOpacity, {
  duration: 500,
  transition: TransitionPresets.linear,
  delay: props.duration - 500
})
source.value = [props.target.x, props.target.y]
sourceOpacity.value = 0

const styles = computed(() => {
  return {
    opacity: opacity.value,
    transform: `translate(${coordinates.value.x}px, ${coordinates.value.y}px)`
  }
})
</script>

<template>
  <slot :styles="styles" />
</template>
