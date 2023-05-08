import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { EditedI, PostI, ThreadI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseUserAuthStore } from '@/stores/UserAuth.store'

export const UsePostsStore = defineStore('PostsStore', {
    state:() => {
        return{
            posts: reactive<PostI[]>(sourceData.posts),
            threads:reactive<ThreadI[]>(sourceData.threads),
        }
    },
    getters:{},
    actions:{
        
        createPost(post:PostI){
            const editedData: EditedI = {
                at: 0,
                by: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
                moderated: false,
            }
            post.edited = editedData,
            post.id = 'ggg' + Math.random()
            post.userId = UseUserAuthStore().authId
            post.publishedAt = Math.floor(Date.now() / 1000),// date in seconds
            post.reactions = undefined
            this.posts.push(post)
            const thread = UseThreadsStore().threads.find(thread => thread.id === post.threadId)
            thread?.posts.push(post.id)

            console.log('allposts', this.posts)
        }
    }
})