<script setup lang="ts">
import PropsDestructure from './components/PropsDestructure.vue'
import DefineModel from './components/DefineModel.vue'
import ExternalTypes from './components/ExternalTypes.vue'

import { ref } from 'vue'

const msg = ref('hello')
</script>

<template>
  <div class="w-full max-w-xl mx-auto py-32">
    <h1 class="text-5xl font-black">Vue 3.3 Playground</h1>
    <h2 class="mt-16 text-2xl font-bold mb-4">Props Destructure</h2>
    <PropsDestructure />
    <PropsDestructure msg="Passing a prop!" />
    <h2 class="mt-16 text-2xl font-bold mb-4">defineModel</h2>
    <DefineModel v-model="msg" />
    msg is <span class="text-green-400">'{{ msg }}'</span>
    <h2 class="mt-16 text-2xl font-bold mb-4">External Types</h2>
    <ExternalTypes />
    <ExternalTypes test-id="example" />
  </div>
</template>
