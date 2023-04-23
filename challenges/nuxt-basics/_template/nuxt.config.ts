// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-vitest'],
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  }
})
