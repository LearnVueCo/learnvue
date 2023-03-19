<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const msg = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})




msg.value = 'a new value'
</script>

<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      "
      class="bg-gray-800 p-4 rounded w-full"
    />
    <div class="flex justify-end">
      <button
        @click="$emit('update:modelValue', '')"
        class="bg-green-500 text-white py-1 px-2 text-sm mt-2 rounded"
      >
        Reset
      </button>
    </div>
  </div>
</template>
