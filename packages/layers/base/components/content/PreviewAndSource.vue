<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  openTab?: string
}>()

const tab = ref(props.openTab ?? 'preview')
</script>
<template>
  <div class="not-prose">
    <div class="flex justify-end">
      <div
        class="rounded-lg inline-flex bg-highlight overflow-hidden border-2 text-sm font-medium"
      >
        <button
          @click="tab = 'preview'"
          class="px-2 py-1"
          :class="{
            'bg-green text-white': tab === 'preview'
          }"
        >
          Preview
        </button>
        <button
          @click="tab = 'source'"
          class="px-2 py-1"
          :class="{
            'bg-green text-white': tab === 'source'
          }"
        >
          Source
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div v-show="tab === 'preview'">
        <slot name="preview"></slot>
      </div>
      <div v-show="tab === 'source'">
        <slot name="source"></slot>
      </div>
    </div>
  </div>
</template>
