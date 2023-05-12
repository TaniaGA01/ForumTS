import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import sourceData from '@/data/data.json';
import type { ForumElementI } from '@/data/data.interfaces'
import { UseThreadsStore } from "./Threads.store";
import { findBySameId } from "@/helpers";

export const UseForumStore = defineStore('ForumStore', {
    state:() => {
        return{
            ...sourceData.forums, //ici pas de reactivité
            forums:reactive(sourceData.forums as ForumElementI[]),
        }
    },
    getters:{
        forumsData:(state) => {
            const forum = (route: string) => computed(() => findBySameId(state.forums, route));
            const threadsData = UseThreadsStore()
            const threads = (route:string) => computed(() => threadsData.threads.filter(thread => thread.forumId === route))

            return{
                get Forum(){
                    return forum
                },
                get Threads(){
                    return threads
                }
            }
        }
    },
    actions:{
        
    }
})