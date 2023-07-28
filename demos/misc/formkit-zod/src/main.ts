import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import tailwindTheme from './tailwind-theme'
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'

const app = createApp(App)

app
  .use(
    plugin,
    defaultConfig({
      icons: {
        ...genesisIcons
      },
      config: {
        classes: generateClasses(tailwindTheme)
      }
    })
  )
  .mount('#app')
