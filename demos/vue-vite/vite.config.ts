import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Pages from 'vite-plugin-pages'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    Icons({ compiler: 'vue3', autoInstall: true }),
    vue({}),
    Pages({
      exclude: ['**/components/*.vue']
    })
  ]
})
