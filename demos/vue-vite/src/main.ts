import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import './style.css'
import { router } from './router'
const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
