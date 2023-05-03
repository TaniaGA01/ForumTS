import { defineStore } from "pinia";
import { reactive,ref } from "vue";
import sourceData from '@/data/data.json';
import type { UserI } from '@/data/data.interfaces'

export const UseUserStore = defineStore('UserStore', {
    state:() => {
        return{
            ...sourceData.users, //ici pas de reactivité
            users:reactive(sourceData.users as UserI[]),
        }
    },
    getters:{
    },
    actions:{
        
    }
})