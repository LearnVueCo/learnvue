<script setup lang="ts">
const props = defineProps<{
  versions: Record<string, string>
}>()

const withIcon = computed(() => {
  return Object.keys(props.versions).filter((key) =>
    ['vue', 'nuxt', 'vite'].includes(key.toLowerCase())
  )
})

const withoutIcon = computed(() => {
  return Object.keys(props.versions).filter(
    (key) => !withIcon.value.includes(key.toLowerCase())
  )
})
</script>

<template>
  <div
    class="mb-8 flex flex-wrap items-center justify-between gap-8 rounded-lg not-prose"
  >
    <div
      v-for="tech in withIcon"
      :key="tech"
      class="shtink-0 flex w-32 items-center"
    >
      <TooltipOnHover position="t">
        <template #default>
          <div class="flex items-center">
            <img
              :src="`/img/icons/${tech.toLowerCase()}.svg`"
              :alt="tech"
              class="mx-0 mr-1 inline-block h-auto w-6"
            />
            <p class="">
              {{ versions[tech] }}
            </p>
          </div>
        </template>
        <template #tooltip>
          <p class="px-2 py-1">{{ tech }}</p>
        </template>
      </TooltipOnHover>
    </div>
    <div v-for="tech in withoutIcon" :key="tech" class="flex items-center">
      <p class="">
        {{ tech }}:
        {{ versions[tech] }}
      </p>
    </div>
  </div>
</template>
