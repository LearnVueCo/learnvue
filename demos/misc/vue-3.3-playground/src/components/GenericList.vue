<script setup lang="ts" generic="T extends { _id: string }">
import IconAccountBox from '~icons/ri/delete-back-2-fill'

defineProps<{
  items: T[]
}>()

defineEmits<{
  (e: 'delete', item: T): void
}>()
</script>
<template>
  <ul class="flex flex-col">
    <li v-for="item in items" :key="item._id" class="flex items-center">
      <button @click="$emit('delete', item)" class="text-red-500">
        <IconAccountBox />
      </button>
      <slot :item="item" />
    </li>
  </ul>
</template>
