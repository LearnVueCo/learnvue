import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  content: {
    sources: {
      articles: {
        prefix: '/articles', // All contents inside this source will be prefixed with `/articles`
        driver: 'fs',
        base: resolve('articles') // Path for source directory
      }
    }
  },
  nitro: {
    publicAssets: [
      {
        baseURL: 'lv-content',
        dir: resolve('./public')
      }
    ]
  }
})
