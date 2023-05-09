import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { EditedI, PostI, ThreadI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import { findBySameId, replaceItem } from "@/helpers";

export const UsePostsStore = defineStore('PostsStore', {
    state:() => {
        return{
            posts: reactive<PostI[]>(sourceData.posts),
            threads:reactive<ThreadI[]>(sourceData.threads),
        }
    },
    getters:{},
    actions:{
        createPost(newPost:PostI){
            const editedData: EditedI = {
                at: 0,
                by: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
                moderated: false,
            }
            newPost.edited = editedData,
            newPost.id = 'ggg' + Math.random()
            newPost.userId = UseUserAuthStore().authId
            newPost.publishedAt = Math.floor(Date.now() / 1000),// date in seconds
            newPost.reactions = undefined
            
            this.posts.push(newPost)
            const thread = findBySameId(UseThreadsStore().threads, newPost.threadId)
            thread?.posts.push(newPost.id)
        },
        editPost(postEdit:PostI){

            const findPostToEdit = this.posts.find(oldPost => oldPost.threadId === postEdit.threadId) as PostI
            
            postEdit.edited = {
                at: findPostToEdit.edited?.at,
                by: findPostToEdit.edited?.by,
                moderated: findPostToEdit.edited?.moderated,
            }
            postEdit.id = findPostToEdit?.id
            postEdit.userId = findPostToEdit.userId
            postEdit.publishedAt = Math.floor(Date.now() / 1000),// date in seconds
            postEdit.reactions = undefined

            replaceItem(this.posts, postEdit.id, postEdit)
        }
    }
})