<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    code?: string
    language?: string | null
    filename?: string | null
    highlights?: Array<any>
  }>(),
  {
    code: '',
    language: null,
    filename: null,
    highlights: Array as () => number[]
  }
)

const { copy } = useClipboard()
const copied = ref(false)
const copyCode = async () => {
  await copy(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}
</script>

<template>
  <div
    class="code-wrapper group relative border-2 text-base text-white not-prose mt-8"
  >
    <div
      v-if="filename !== 'HIDE'"
      class="justify-start-end z-20 flex h-10 w-full items-center overflow-hidden bg-charcoal-700 pr-4 text-sm font-sans font-medium"
    >
      <div v-if="filename" class="flex h-full items-center px-4">
        <Icon
          v-if="filename.includes('.')"
          class="mr-2 text-lg text-white"
          :name="
            language === 'js' || language === 'javascript'
              ? 'logos:javascript'
              : language === 'vue'
              ? 'logos:vue'
              : language === 'ts' || language === 'typescript'
              ? 'logos:typescript-icon'
              : ''
          "
        />
        {{ filename }}
      </div>
      <div class="ml-auto flex items-center gap-x-4">
        <p class="hidden md:block">
          {{ language }}
        </p>
        <Transition name="icon" mode="out-in">
          <Icon
            v-if="!copied"
            name="ri:file-copy-line"
            class="text-lg"
            @click="copyCode"
          />
          <Icon v-else name="ri:check-line" class="text-lg" @click="copyCode" />
        </Transition>
      </div>
    </div>
    <div class="code-body max-h-[500px] overflow-auto py-4 leading-snug">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-wrapper {
  @apply overflow-x-auto  rounded-xl bg-charcoal-800;
  counter-reset: lines;
}

.code-body::-webkit-scrollbar {
  background-color: transparent;
  width: 0.5rem;
}

.code-body::-webkit-scrollbar-thumb {
  background-color: theme(colors.charcoal.400);
  width: 4px;
  border-radius: 5px;
}

:deep(pre code .line) {
  display: block;
  min-height: 1rem;
  @apply pr-4;
}

:deep(pre code .line::before) {
  counter-increment: lines;
  content: counter(lines);
  @apply mr-3 inline-block w-8 border-r pl-2 pr-2 text-right text-white opacity-50;
}

:deep(pre code .line.highlight) {
  @apply bg-charcoal-100 bg-opacity-10;
}
</style>
