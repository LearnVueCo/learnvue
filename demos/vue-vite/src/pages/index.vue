<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import MoonIcon from '~icons/ri/moon-line'
import SunIcon from '~icons/ri/sun-line'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <div class="container max-w-4xl mx-auto">
    <header class="h-16 flex items-center">
      <LearnVueIcon class="mr-1 -mt-1 inline-block" />
      <span class="text-xl font-bold"> Learn </span>
      <span class="text-xl font-bold text-green">Vue</span>
      <button
        class="hover:text-highlight flex items-center transition-opacity ml-auto"
        @click="toggleDark()"
      >
        <MoonIcon v-if="isDark" />
        <SunIcon v-else />
      </button>
    </header>

    <h1 class="mt-24 text-5xl font-extrabold font-title">Vue Vite Demo</h1>
  </div>
</template>
