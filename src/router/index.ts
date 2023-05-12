import { createRouter, createWebHistory } from 'vue-router'
import { UseThreadsStore } from '@/stores/Threads.store'


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
        const threadsStores = UseThreadsStore()
        const threadExists = threadsStores.threads.find(thread => thread.id === to.params.id)
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
      path: '/forum/:id/newThread',
      name: 'threadCreator',
      component: () => import('@/pages/ThreadCreatePage.vue')
    },
    {
      path: '/thread/:id/edit',
      name: 'threadEditor',
      component: () => import('@/pages/ThreadEditPage.vue')
    },
    {
      path: '/user',
      name: 'userProfile',
      component: () => import('@/pages/Profile.vue'),
      meta: { toTop: true, smoothScroll: true }
    },
    {
      path: '/user/edit',
      name: 'userProfileEdit',
      component: () => import('@/pages/Profile.vue'),
      props:{ edit:true }
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('@/pages/NotFound.vue')
    },
  ],
  scrollBehavior (to){
    const scroll = {}
    if(to.meta.toTop) scroll.top = 0
    if(to.meta.smoothScroll) scroll.behavior = 'smooth'

    return scroll
  },
})

export default router
