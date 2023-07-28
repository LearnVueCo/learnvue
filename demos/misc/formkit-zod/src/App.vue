<script setup lang="ts">
import BaseForm from './components/BaseForm.vue'
import SchemaForm from './components/SchemaForm.vue'
import ZodForm from './components/ZodForm.vue'
</script>
<template>
  <div class="max-w-xs mx-auto py-16">
    <h1 class="font-black text-2xl">Base Form</h1>
    <BaseForm class="mt-8" />
    <h1 class="font-black text-2xl mt-16">Schema Form</h1>
    <SchemaForm class="mt-8" />
    <h1 class="font-black text-2xl mt-16">Zod Form</h1>
    <ZodForm class="mt-8" />
  </div>
</template>
