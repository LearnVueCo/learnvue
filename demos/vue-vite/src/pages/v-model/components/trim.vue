<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <div>
    <input type="text" v-model.trim="value" />
    <p>Value: {{ value }}</p>
  </div>
</template>
