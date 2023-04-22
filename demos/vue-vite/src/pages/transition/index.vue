<script setup lang="ts">
import { ref } from 'vue'
import FadeTransition from './components/FadeTransition.vue'
import { fadeTransition } from './utils/transitions'
const showImage = ref(true)

const selectedTab = ref(0)
const transitionName = ref('slide-right')

watch(selectedTab, (val, old) => {
  transitionName.value = val > old ? 'slide-left' : 'slide-right'
})
</script>
<template>
  <div>
    <button @click="showImage = !showImage" class="bg-green px-4 py-2 rounded">
      Toggle
    </button>
    <Transition name="fade">
      <img
        v-if="showImage"
        class="mt-8 max-w-md mx-auto rounded-lg"
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80"
      />
    </Transition>
    <FadeTransition>
      <img
        v-if="showImage"
        class="mt-8 max-w-md mx-auto rounded-lg"
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80"
      />
    </FadeTransition>
    <Transition v-bind="fadeTransition">
      <img
        v-if="showImage"
        class="mt-8 max-w-md mx-auto rounded-lg"
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2144&q=80"
      />
    </Transition>
    <div class="mt-32 flex gap-4 justify-center mb-8">
      <button
        v-for="i in 3"
        @click="selectedTab = i"
        class="bg-green px-2 rounded"
      >
        Tab {{ i }}
      </button>
    </div>
    <Transition :name="transitionName" mode="out-in">
      <div :key="selectedTab">Tab {{ selectedTab }} Content</div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-left-enter-to {
  opacity: 1;
}

.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.2s;
}
</style>
