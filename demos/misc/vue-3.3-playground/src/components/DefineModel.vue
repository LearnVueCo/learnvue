<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <div>
    <input
      v-model="modelValue"
      class="rounded bg-gray-900 p-2 outline-green-500"
    />
  </div>
</template>
