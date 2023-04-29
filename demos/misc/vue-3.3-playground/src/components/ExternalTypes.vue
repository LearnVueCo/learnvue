<script setup lang="ts">
import type { BaseProps } from '../types'

const props = defineProps<BaseProps>()

// we get type safety on this.
console.log(props.testId)

// you even get type inference and can destructure for props from external types!
// const { testId = 'default' } = defineProps<BaseProps>()
</script>

<template>
  <p>
    testId will be typed in your IDE: <code>{{ testId }}</code>
  </p>
</template>
