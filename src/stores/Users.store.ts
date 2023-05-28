import { defineStore } from "pinia";
import type { UserI } from '@/data/data.interfaces'
import { ref } from "vue";
import * as firestone from 'firebase/firestore';
import { db } from '@/data/api/dataBaseApi'
import DataBaseServices from '@/data/api/dataBaseApi.helpers'

// get asynchronic dataBase
const dataBaseServices = new DataBaseServices()
const allUsers = ref<UserI[]>(await dataBaseServices.getDataBase('users'))

//Real-time database update
const dataBase = firestone.collection(db, 'users')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    allUsers.value = dataBaseList.value 
    return allUsers.value
});

export const UseUserStore = defineStore('UserStore', {

    state:() => {
        return{
            users: allUsers
        }
    },
    getters:{
    },
    actions:{
        
    }
})