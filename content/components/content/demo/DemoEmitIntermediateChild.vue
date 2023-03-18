<script setup>
const emit = defineEmits(['customChange'])

const handleChange = (event) => {
  emit('customChange', event.target.value.toUpperCase())
}
</script>

<template>
  <div>
    <label class="block text-xs uppercase opacity-50">My Custom Input</label>
    <input
      type="text"
      placeholder="Custom input!"
      class="mb-4 rounded bg-black bg-opacity-5 p-2 outline-none dark:bg-white dark:bg-opacity-5"
      @input="handleChange"
    />
  </div>
</template>
