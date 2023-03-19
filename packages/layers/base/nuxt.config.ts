export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/fontaine',
    '@nuxt/content'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
