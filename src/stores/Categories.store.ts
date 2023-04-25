import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { CategoryI} from '@/data/data.interfaces'

export const UseCategoriesStore = defineStore('CategoriesStore', {
    state:() => {
        return{
            categories: reactive<CategoryI[]>(sourceData.categories)
        }
    },
    getters:{},
    actions:{}
})