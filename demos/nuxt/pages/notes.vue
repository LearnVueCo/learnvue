<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/login')
    }
  })
})

const { data: notes } = await useFetch('/api/notes', {
  key: `notes for ${user.value.id}`,
  headers: useRequestHeaders(['cookie'])
})
</script>
<template>
  <div>
    <p class="mt-8 mb-16">Hello {{ user?.email }}</p>

    <h1 class="text-3xl font-semibold">Your Notes</h1>
    <div class="flex flex-col gap-4 mt-4">
      <div v-for="note in notes" :key="note.id" class="p-8 bg-gray-700 rounded">
        {{ note.content }}
      </div>
    </div>
  </div>
</template>
