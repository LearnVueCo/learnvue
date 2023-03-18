import { resolve, dirname } from 'pathe'
import { fileURLToPath } from 'url'

const resolvePath = (s: string) => {
  let base = import.meta.url
  base = base.toString()
  if (base.startsWith('file://')) {
    base = dirname(fileURLToPath(base))
  }
  return resolve(base, s)
}

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@vueuse/nuxt'],
  content: {
    sources: {
      articles: {
        prefix: '/articles', // All contents inside this source will be prefixed with `/articles`
        driver: 'fs',
        base: resolvePath('./articles') // Path for source directory
      }
    }
  },
  nitro: {
    publicAssets: [
      {
        baseURL: 'lv-content',
        dir: resolvePath('./public')
      }
    ]
  }
})
