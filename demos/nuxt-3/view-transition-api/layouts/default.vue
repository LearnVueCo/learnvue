<template>
  <div class="min-h-screen w-screen bg-black text-white">
    <header class="flex container mx-auto gap-x-8 py-16">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/join">Join</NuxtLink>
    </header>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>

<style>
html {
  color-scheme: dark;
}
</style>
