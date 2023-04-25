import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { ThreadI } from '@/data/data.interfaces'

export const UseThreadsStore = defineStore('ThreadsStore', {
    state:() => {
        return{
            threads:reactive<ThreadI[]>(sourceData.threads),
        }
    },
    getters:{},
    actions:{
    }
})