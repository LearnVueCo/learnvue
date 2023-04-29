<script setup lang="ts">
import { watch } from 'vue'

const { msg = 'Default' } = defineProps<{
  msg?: string
}>()

// this should be () => msg!!
// watch(msg, () => {
//   console.log(msg)
// })

// limitation of setting defaults is that nothing is stopping you from setting the wrong type as a default value...
// for example,. the type here will be string | 4
// const { msg = 4 } = defineProps<{
//   msg?: string
// }>()
</script>

<template>
  <div>
    {{ msg }}
  </div>
</template>
