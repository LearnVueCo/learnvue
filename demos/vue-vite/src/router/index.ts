import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import WritableComputed from '@/pages/WritableComputed.vue'
import Transition from '@/pages/Transition.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/writable-computed-v-model', component: WritableComputed },
  { path: '/transition', component: Transition }
]
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
})
