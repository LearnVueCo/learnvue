<script setup lang="ts">
const msg = ref('')
</script>

<template>
  <div>
    <p>msg = {{ msg }}</p>
    <MyInput v-model="msg" class="mt-8" />
  </div>
</template>
