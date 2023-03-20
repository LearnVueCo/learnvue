export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/fontaine',
    '@nuxt/content',
    '@nuxtjs/color-mode'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
