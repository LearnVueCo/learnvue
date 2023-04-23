<script setup lang="ts">
// for this to work in the current state of vite-plugin-vue, edit @vue/compiler-sfc/compiler-sfc.cjs.js to remove checks for `options.defineModel`

const modelValue = defineModel<string>() // macro for defineProps and defineEmits
</script>

<template>
  <p>
    <input v-model="modelValue" class="bg-gray-900" />
  </p>
</template>
