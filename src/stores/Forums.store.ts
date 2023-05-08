import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import sourceData from '@/data/data.json';
import type { ForumElementI } from '@/data/data.interfaces'

export const UseForumStore = defineStore('ForumStore', {
    state:() => {
        return{
            ...sourceData.forums, //ici pas de reactivité
            forums:reactive(sourceData.forums as ForumElementI[]),
        }
    },
    getters:{
    },
    actions:{
        
    }
})