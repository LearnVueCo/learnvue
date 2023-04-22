<script setup lang="ts">
const { count, increment } = useCounter()
const navigator = window.navigator
const connection = (navigator as any).connection

const isOnline = ref(navigator.onLine)
const showOnline = ref(false)

const effectiveType = ref('4g')
const loadFullSizeImage = ref(false)

function updateNetworkInfo() {
  if (connection) {
    effectiveType.value = connection.effectiveType ?? 'unknown'
  }
}

if (connection) {
  connection.addEventListener('change', updateNetworkInfo)
  updateNetworkInfo()
}

/* Keep online/offline behavior for browsers without Network Information support */
window.addEventListener('offline', () => {
  isOnline.value = false
})

/* Keep online/offline behavior for browsers without Network Information support */
window.addEventListener('online', () => {
  isOnline.value = true
  showOnline.value = true
  setTimeout(() => {
    showOnline.value = false
  }, 2500)
})
</script>

<template>
  <div class="flex w-full text-white">
    <div
      v-if="isOnline && showOnline"
      class="bg-green-600 p-4 rounded-b w-full text-center flex items-center justify-center"
    >
      Back online
    </div>
    <div
      v-else-if="!isOnline"
      class="bg-gray-400 p-4 rounded-b w-full text-center flex items-center justify-center"
    >
      Offline
    </div>
  </div>

  <div class="w-full max-w-4xl mx-auto rounded relative mt-8 overflow-hidden">
    <button
      v-if="effectiveType !== '4g' && !loadFullSizeImage"
      @click="loadFullSizeImage = true"
      class="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-green-500 rounded"
    >
      Load Image
    </button>
    <img
      :src="
        loadFullSizeImage || effectiveType === '4g'
          ? '/full-size.webp'
          : '/thumbnail.webp'
      "
      class="w-full h-auto relative"
      :class="{
        ' blur-md': !loadFullSizeImage && effectiveType !== '4g'
      }"
    />
  </div>
</template>
