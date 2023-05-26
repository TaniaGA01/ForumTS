import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { CategoryI } from '@/data/data.interfaces'
import { findBySameId } from "@/helpers";
import { UseForumStore } from "./Forums.store";
import * as firestone from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'

const app = initializeApp(firebaseConfig);
const db:firestone.Firestore = firestone.getFirestore(app)
const categories = ref<CategoryI[]>([])

const dataBase = firestone.collection(db, 'categories')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    return categories.value = dataBaseList.value;
});

export const UseCategoriesStore = defineStore('CategoriesStore', {
    state:() => {
        return{
            categories: categories
        }
    },
    getters:{
        categoriesData:(state)=>{
            const category = (route:string) => findBySameId(state.categories, route)

            const forumStore = UseForumStore()
            const getForumsByCategorie = (category:CategoryI) => {
                return forumStore.forums.filter(forum => forum.categoryId === category.id)
            }

            return{
                get Category(){
                    return category
                },
                get ForumByCategory(){
                    return getForumsByCategorie
                }
            }
        }
    },
    actions:{}
})