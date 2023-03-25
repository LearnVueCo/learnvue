<script setup lang="ts">
const uppercase = ref('')

function handleCustomChange(s: string) {
  uppercase.value = s
}
</script>

<template>
  <div class="p-4">
    <IntermediateChild @custom-change="handleCustomChange" />
    <p>Uppercase: {{ uppercase }}</p>
  </div>
</template>
