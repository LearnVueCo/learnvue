<script setup lang="ts">
const selected = ref(1)
defineProps<{
  fLang?: string
  fFilename: string
  sLang?: string
  sFilename: string
}>()

const x = ref(0)
const width = ref(0)
const dirty = ref(false)
const select = (i: number, el: HTMLElement) => {
  if (!dirty.value && width.value !== 0) {
    dirty.value = true
  }
  x.value = el.offsetLeft
  width.value = el.clientWidth
  selected.value = i
}

const first = ref()
onMounted(() => {
  setTimeout(() => {
    select(1, first.value)
  }, 100)
})
</script>

<template>
  <div class="prose-code relative text-base not-prose mt-8">
    <div
      class="max-w-calc(100%-32px) absolute top-[2px] left-[2px] z-10 flex h-10 items-center rounded-t-lg"
    >
      <div
        class="absolute h-8 rounded-lg bg-green bg-opacity-20"
        :class="{
          'transition-all duration-300': dirty
        }"
        :style="{
          left: x + 4 + 'px',
          width: width - 8 + 'px'
        }"
      ></div>
      <button
        ref="first"
        class="flex h-full items-center px-3 font-sans font-medium text-sm text-white"
        :class="{
          'opacity-90 transition-opacity hover:opacity-100': selected !== 1
        }"
        @click="select(1, $event.currentTarget as HTMLElement)"
      >
        {{ fFilename }}
      </button>
      <button
        class="flex items-center px-3 font-sans font-medium text-sm text-white"
        :class="{
          'opacity-90 transition-opacity hover:opacity-100': selected != 2
        }"
        @click="select(2, $event.currentTarget as HTMLElement)"
      >
        {{ sFilename }}
      </button>
    </div>

    <div v-show="selected == 1">
      <ContentSlot :use="$slots.first" />
    </div>
    <div v-show="selected == 2">
      <ContentSlot :use="$slots.second" />
    </div>
  </div>
</template>
