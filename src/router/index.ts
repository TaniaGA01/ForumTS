import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data/data.json'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue')
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
      path: '/forum/:id',
      name:'Forum',
      component: () => import('@/pages/Forum.vue')

    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('@/pages/Category.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('@/pages/NotFound.vue')
    },
  ]
})

export default router
