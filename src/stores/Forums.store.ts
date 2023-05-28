import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ForumElementI } from '@/data/data.interfaces'
import { UseThreadsStore } from "./Threads.store";
import { findBySameId } from "@/helpers";
import * as firestone from 'firebase/firestore';
import { db } from '@/data/api/dataBaseApi'
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
const dataBaseServices = new DataBaseServices()
const forums = ref<ForumElementI[]>(await dataBaseServices.getDataBase('forums'))

const dataBase = firestone.collection(db, 'forums')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    return forums.value = dataBaseList.value;
});

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