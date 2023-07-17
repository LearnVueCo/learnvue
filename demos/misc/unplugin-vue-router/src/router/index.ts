import { createRouter, createWebHistory } from 'vue-router/auto'

export const router = createRouter({
  history: createWebHistory(),
  extendRoutes(routes) {
    routes.push({
      path: '/my-manual-route',
      component: () => import('../pages/index.vue')
    })
  }
})
