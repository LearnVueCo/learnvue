<script setup lang="ts">
import SocialCard from '@/components/atoms/MyButton.vue?raw'
import { getHighlighter } from 'shiki-es'

const highlighter = await getHighlighter({ theme: 'dracula-soft' })

const code = highlighter.codeToHtml(SocialCard, {
  lang: 'vue'
})
</script>

<template>
  <div v-html="code" />
</template>
