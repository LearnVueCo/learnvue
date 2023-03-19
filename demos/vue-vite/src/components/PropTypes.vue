<script setup lang="ts">
import { BaseProps } from '../types'

// without Vue Macros

interface Props extends BaseProps {
  foo: string
}
const props = defineProps<Props>()
console.log(props)
</script>

<template>
  <div>
    {{ testId }}
  </div>
</template>
