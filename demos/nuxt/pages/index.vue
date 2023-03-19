<template>
  <main>
    <h1 class="text-3xl font-black text-white">LearnVue Demo</h1>
    <p class="mt-4">Welcome to the LearnVue demo area.</p>
    <p class="mt-4">
      The demos are separated by type. Nuxt-specific tutorials have their own
      live Nuxt site demo, while other components are in an Astro app!
    </p>
    <div class="flex gap-4 mt-8">
      <NuxtLink
        to="/login"
        class="px-4 py-2 rounded bg-charcoal-600 hover:bg-charcoal-500"
        >Nuxt demo</NuxtLink
      >
      <a
        href="/vue"
        class="px-4 py-2 rounded bg-charcoal-600 hover:bg-charcoal-500"
        >Other Vue demos</a
      >
    </div>
  </main>
</template>
