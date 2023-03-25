export default defineNuxtConfig({
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  content: {
    sources: {
      articles: {
        prefix: '/articles', // All contents inside this source will be prefixed with `/articles`
        driver: 'fs',
        base: __dirname + '/articles' // Path for source directory
      }
    }
  },
  nitro: {
    publicAssets: [
      {
        baseURL: 'content',
        dir: __dirname + '/public'
      }
    ]
  }
})
