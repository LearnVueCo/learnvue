<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  p: any
}>()

const value = ref('')
const lastName = ref('')
</script>

<template>
  <div v-if="p?.noWhitespace" class="p-4">
    <label> First Name </label>
    <input
      v-model="value"
      type="text"
      placeholder="Input"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <div>
      <label> Last Name </label>
      <input
        v-model="lastName"
        type="text"
        placeholder="Input"
        class="bg-highlight mt-1 rounded px-4 py-2 outline-none"
      />
    </div>
    <p class="mt-4">Name: {{ value }}</p>
    <p class="mt-2">Last Name: {{ lastName.replace(/ /g, '') }}</p>
  </div>
  <div v-if="p?.multiple" class="p-4">
    <label> First Name </label>
    <input
      v-model="value"
      type="text"
      placeholder="Input"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <div>
      <label> Last Name </label>
      <input
        v-model="lastName"
        type="text"
        placeholder="Input"
        class="bg-highlight mt-1 rounded px-4 py-2 outline-none"
      />
    </div>
    <p class="mt-4">Name: {{ value }}</p>
    <p class="mt-2">Last Name: {{ lastName }}</p>
  </div>
  <div v-else-if="p?.customTextInput" class="p-4">
    <label> First Name </label>
    <input
      v-model="value"
      type="text"
      placeholder="Input"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <p class="mt-4">Name: {{ value }}</p>
  </div>
  <div v-else class="py-4 text-center">
    <input
      v-if="p?.lazy"
      v-model.lazy="value"
      type="text"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <input
      v-else-if="p?.number"
      v-model.number="value"
      type="text"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <input
      v-else-if="p?.trim"
      v-model.trim="value"
      type="text"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <input
      v-else
      v-model="value"
      type="text"
      class="bg-highlight rounded px-4 py-2 outline-none"
    />
    <p v-if="!p?.trim">Value: {{ value }}</p>
    <p v-else>Value: "{{ value }}"</p>
  </div>
</template>
