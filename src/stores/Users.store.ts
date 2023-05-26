import { defineStore } from "pinia";
import type { UserI } from '@/data/data.interfaces'
import { ref } from "vue";
import * as firestone from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'

const app = initializeApp(firebaseConfig);
const db:firestone.Firestore = firestone.getFirestore(app)
const users = ref<UserI[]>([])

const dataBase = firestone.collection(db, 'users')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    return users.value = dataBaseList.value;
});

export const UseUserStore = defineStore('UserStore', {

    state:() => {
        
        return{
            users:users
        }
    },
    getters:{
    },
    actions:{
        
    }
})