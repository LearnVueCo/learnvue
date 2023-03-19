<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <header class="container flex items-center w-full h-16 py-8 text-sm">
    <NuxtLink :to="localePath('/')" class="flex items-center hover:opacity-80">
      <img src="/logo-dark.svg" class="h-[24px] mr-2" />
      <span class="text-lg font-extrabold text-white"> Learn</span>
      <span class="mr-2 text-lg font-extrabold text-green">Vue</span>
    </NuxtLink>
    <nav class="ml-4 font-medium">
      <NuxtLink
        :to="localePath('/blog')"
        class="px-2 py-1 ml-auto mr-1 text-sm font-medium rounded hover:bg-charcoal-600 hover:text-white"
        >Demo Blog</NuxtLink
      >
    </nav>
    <div class="ml-auto flex items-center">
      <NuxtLink
        v-for="{ code, name } in locales"
        :key="code"
        :to="switchLocalePath(code)"
        class="mr-4"
        :class="{
          'text-white': code === locale
        }"
      >
        {{ name }}
      </NuxtLink>

      <NuxtLink
        to="https://learnvue.co"
        target="_blank"
        class="px-2 py-1 ml-auto text-sm font-medium rounded hover:bg-charcoal-600 hover:text-white"
        >Main Site</NuxtLink
      >
      <button
        v-if="user"
        @click="client.auth.signOut()"
        class="px-2 py-1 text-sm font-medium rounded hover:bg-charcoal-600"
      >
        Log out
      </button>
    </div>
  </header>
</template>
