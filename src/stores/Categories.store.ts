import { defineStore } from "pinia";
import { reactive } from "vue";
import type { CategoryI } from '@/data/data.interfaces'
import { findBySameId } from "@/helpers";
import { UseForumStore } from "./Forums.store";
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
const dataBaseServices = new DataBaseServices()
const categories = reactive<CategoryI[]>(await dataBaseServices.getDataBase('categories'))

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