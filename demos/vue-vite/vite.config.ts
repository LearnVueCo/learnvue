import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },

  plugins: [
    Icons({ compiler: 'vue3' }),
    vue(),
    Components({
      dirs: ['./src/components'],
      dts: true
    }),
    AutoImport({
      dts: true,
      dirs: ['./src/composables'],
      imports: [
        'vue',
        {
          vueUse: [
            'onClickOutside',
            'useTimeAgo',
            'useVModel',
            ['useMouse', 'mouseyMouse']
          ]
        }
      ]
    })
  ]
})
