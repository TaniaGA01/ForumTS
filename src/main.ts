import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import router from './router'

import '@/assets/main.css'

const forumApp = createApp(App)
forumApp.use(createPinia())
forumApp.use(router)

const firebaseApp = initializeApp(firebaseConfig);

forumApp
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

forumApp.mount('#app')
