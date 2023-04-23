<script setup lang="ts">
defineProps({
  modelValue: String
})

// defines what events our component emits
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label> First Name </label>
    <input
      type="text"
      placeholder="Input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>
