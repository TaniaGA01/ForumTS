import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data/data.json'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/thread/:id',
      name: 'threadShow',
      component: () => import('@/pages/ThreadShow.vue'),
      beforeEnter(to) { // Page not found without changing url
        const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
        if (!threadExists) {
          return {
            name: 'NotFound',
            params: { pathMatch: to.path.substring(1).split('/') },
            query: to.query,
            hash: to.hash,
          }
        }
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('@/pages/NotFound.vue')
    },
  ]
})

export default router
