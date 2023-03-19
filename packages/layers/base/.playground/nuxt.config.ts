import { resolve } from 'path'

export default defineNuxtConfig({
  extends: '../',
  content: {
    sources: {
      articles: {
        prefix: '/articles', // All contents inside this source will be prefixed with `/articles`
        driver: 'fs',
        base: resolve(__dirname, './../../../../content/articles') // Path for source directory
      }
    },
    documentDriven: true,
    highlight: {
      theme: 'dracula-soft',
      preload: ['vue', 'html', 'css', 'js', 'md', 'json']
    }
  }
})
