<template>
  <Transition
    enter-from-class="opacity-0"
    enter-leave-class="opacity-100"
    enter-active-class="transition-opacity duration-500"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-opacity duration-500"
  >
    <slot />
  </Transition>
</template>
