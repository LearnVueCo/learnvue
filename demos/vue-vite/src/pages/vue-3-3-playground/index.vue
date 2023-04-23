<script setup lang="ts">
import { ref } from 'vue'
import SimpleInput from './components/SimpleInput.vue'
import SimpleText from './components/SimpleText.vue'
import ImportedTypes from './components/ImportedTypes.vue'
const text = ref('Hello World')
</script>

<template>
  <div class="text-white">
    <h1>Playground</h1>

    <SimpleText />
    <SimpleInput v-model="text" />
    <p>input value: {{ text }}</p>
    <ImportedTypes test-id="test-id" example="This is imported types!" />
    <button @click="text += 'hi'">Add something</button>
  </div>
</template>
