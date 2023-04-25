import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { UserI } from '@/data/data.interfaces'

export const UseUserStore = defineStore('UserStore', {
    state:() => {
        return{
            users:reactive<UserI[]>(sourceData.users),
        }
    },
    getters:{},
    actions:{
    }
})