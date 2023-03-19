<script setup lang="ts">
defineEmits(['submit'])
defineProps<{
  callToAction: string
}>()

const email = ref('')
const password = ref('')
</script>

<template>
  <form
    @submit.prevent="$emit('submit', email, password)"
    class="flex flex-col gap-2"
  >
    <input
      type="email"
      placeholder="Email"
      v-model="email"
      class="p-2 bg-gray-600 rounded"
    />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      class="p-2 bg-gray-600 rounded"
    />
    <button type="submit" class="p-2 text-white bg-green-500 rounded">
      {{ callToAction }}
    </button>
  </form>
</template>
