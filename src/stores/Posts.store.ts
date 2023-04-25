import { defineStore } from "pinia";
import { reactive } from "vue";
import sourceData from '@/data/data.json';
import type { PostI, ThreadI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'

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
            post.id = 'ggg' + Math.random()
            this.posts.push(post)
            const thread = UseThreadsStore().threads.find(thread => thread.id === post.threadId)
            console.log(thread)
            thread?.posts.push(post.id)
        }
    }
})