<script setup lang="ts">
import { ref } from 'vue'
import PropsDestructure from './components/PropsDestructure.vue'
import DefineModel from './components/DefineModel.vue'
import ExternalTypes from './components/ExternalTypes.vue'
import GenericList from './components/GenericList.vue'

const msg = ref('hello')

const items = [
  { _id: '1', name: 'Matt' },
  { _id: '2', name: 'John' },
  { _id: '3', name: 'Jane' }
]

// will give TS-error because it's not an object with _id
const moreItems = [{ name: 'Matt' }, { name: 'John' }, { name: 'Jane' }]
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
    <h2 class="mt-16 text-2xl font-bold mb-4">Generics</h2>
    <GenericList
      key-field="_id"
      :items="items"
      @delete="(item) => console.log(`do something with id: ${item._id}`)"
    >
      <template #default="{ item }"> here - {{ item._id }} </template>
    </GenericList>
    <!-- // @ts-ignore  -->
    <GenericList
      key-field="name"
      :items="moreItems"
      @delete="(item) => console.log(`do something with id: ${item.name}`)"
    >
      <template #default="{ item }"> here - {{ item.name }} </template>
    </GenericList>
  </div>
</template>
