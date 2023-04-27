import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { UserI } from '@/data/data.interfaces'

export const UseUserStore = defineStore('UserStore', {
    state:() => {
        return{
            ...sourceData.users,
            users:reactive<UserI[]>(sourceData.users),
            authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
        }
    },
    getters:{
        
    },
    actions:{
        authUser(){
            return this.users.find( user => user.id === this.authId )
        }
    }
})