import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { CategoryI} from '@/data/data.interfaces'
import { findBySameId } from "@/helpers";
import { UseForumStore } from "./Forums.store";

export const UseCategoriesStore = defineStore('CategoriesStore', {
    state:() => {
        return{
            categories: reactive<CategoryI[]>(sourceData.categories)
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