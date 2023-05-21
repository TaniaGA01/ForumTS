import { defineStore } from "pinia";
import type { UserI } from '@/data/data.interfaces'
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
import { reactive } from "vue";
const dataBaseServices = new DataBaseServices()
const users = reactive<UserI[]>(await dataBaseServices.getDataBase('users'))

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