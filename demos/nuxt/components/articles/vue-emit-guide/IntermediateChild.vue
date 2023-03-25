<script setup lang="ts">
const emit = defineEmits(['customChange'])

const handleChange = (event: Event) => {
  emit('customChange', (event.target as HTMLInputElement).value.toUpperCase())
}
</script>

<template>
  <input type="text" @input="handleChange" class="border-2 p-2 rounded" />
</template>
