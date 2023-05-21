import { defineStore } from "pinia";
import type { UserI } from '@/data/data.interfaces'
import UsersServices from '@/data/api/usersApi.helper'
import { reactive } from "vue";
const userServices = new UsersServices()
const users = reactive<UserI[]>(await userServices.getUsers())

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