import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import App from './App.vue'
import router from './router'

import '@/assets/main.css'

const forumApp = createApp(App)
forumApp.use(createPinia())
forumApp.use(router)

initializeApp(firebaseConfig);

forumApp.mount('#app')
