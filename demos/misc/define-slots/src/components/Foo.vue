<script setup lang="ts">
defineSlots<{
  default(props: { msg: string }): any
  content(props: { title: string }): any
}>()
</script>
<template>
  <div>
    <slot msg="4" />
    <slot name="content" title="hello" />
  </div>
</template>
