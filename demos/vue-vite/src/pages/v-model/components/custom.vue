<script setup>
import { ref } from 'vue'
import CustomTextInput from './CustomTextInput.vue'

const firstName = ref('')
</script>

<template>
  <custom-text-input v-model="firstName" />
  Name: {{ firstName }}
</template>
