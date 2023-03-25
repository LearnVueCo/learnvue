<template>
  <div class="border-blue max-w-sm mx-auto border relative rounded">
    <div
      class="absolute right-0 -top-0 rounded-bl bg-blue-600 p-1 text-sm text-white"
    >
      <p>Child.vue</p>
    </div>
    <button
      class="my-4 rounded bg-green px-2 py-1 text-white"
      @click="$emit('add', Math.random())"
    >
      Add Math.random
    </button>
  </div>
</template>
