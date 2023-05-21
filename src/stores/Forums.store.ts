import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import ForumServices from '@/data/api/forumsApi.helper'
import type { ForumElementI } from '@/data/data.interfaces'
import { UseThreadsStore } from "./Threads.store";
import { findBySameId } from "@/helpers";
const forumServices = new ForumServices()
const forums = reactive<ForumElementI[]>(await forumServices.getForums())

export const UseForumStore = defineStore('ForumStore', {
    state:() => {
        return{
            forums:forums,
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