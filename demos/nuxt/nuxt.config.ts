import { defineNuxtConfig } from 'nuxt/config'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@vueuse/nuxt', '@nuxtjs/tailwindcss'],
  devtools: {
    enabled: true
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  workspaceDir: '.'
})
