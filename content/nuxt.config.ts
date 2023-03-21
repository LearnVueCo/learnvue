export default defineNuxtConfig({
  modules: ['@nuxt/content'],
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
        dir: __dirname + '/public'
      }
    ]
  }
})
