import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({
      // experimental
      autoInstall: true
    }),
    vue({
      script: {
        // @ts-expect-error experimental workaround for 3.3.alpha
        defineModel: true,
        propsDestructure: true
      }
    })
  ]
})
