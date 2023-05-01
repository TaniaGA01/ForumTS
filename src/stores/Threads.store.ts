import { defineStore } from "pinia";
import { ref } from "vue";
import sourceData from '@/data/data.json';
import type { ThreadI } from '@/data/data.interfaces'

export const UseThreadsStore = defineStore('ThreadsStore', {
    state:() => {
        return{
            threads:ref<ThreadI[]>(sourceData.threads),
        }
    },
    getters:{},
    actions:{
    }
})