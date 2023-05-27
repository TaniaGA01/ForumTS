import { defineStore } from "pinia";
import type { UserI } from '@/data/data.interfaces'
import { ref } from "vue";
import * as firestone from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'

const app = initializeApp(firebaseConfig);
const db:firestone.Firestore = firestone.getFirestore(app)
const allUsers = ref<UserI[]>([])

const dataBase = firestone.collection(db, 'users')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    allUsers.value = dataBaseList.value 
    console.log('tr', allUsers.value)
    return allUsers.value
});

export const UseUserStore = defineStore('UserStore', {

    state:() => {
        console.log('hi', allUsers.value)
        return{
            users: allUsers
        }
    },
    getters:{
    },
    actions:{
        
    }
})