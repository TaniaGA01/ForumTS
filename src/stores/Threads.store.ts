import { defineStore } from "pinia";
import { reactive } from "vue";
// import sourceData from '@/data/data.json';
import ThreadServices from '@/data/api/threadsApi.helper'
import type { ThreadI } from '@/data/data.interfaces'
import { UseUserAuthStore } from "./UserAuth.store";
import { UseForumStore } from "./Forums.store";
import { computed } from 'vue';
import { UsePostsStore } from '@/stores/Posts.store'
import { findBySameId } from "@/helpers";
const threadServices = new ThreadServices()
const threads = reactive<ThreadI[]>(await threadServices.getThreads())

export const UseThreadsStore = defineStore('ThreadsStore', {
    state:() => {
        return{
            // ...sourceData.threads,
            threads:threads,
            threadId:''
        }
    },
    getters:{
        threadsData:(state) => {
            const thread = (route:string) => computed(() => findBySameId(state.threads, route))

            const postsStore = UsePostsStore()
            const threadPosts = (route:string) => computed(() => postsStore.posts.filter(post => post.threadId === route))

            return{
                get Thread(){
                    return thread
                },
                get ThreadPost(){
                    return threadPosts
                }
            }
        }
    },
    actions:{
        // constructor
        createThread(newThreadData:ThreadI, content:string){

            newThreadData.contributors = [],
            newThreadData.firstPostId = '',
            newThreadData.userId = UseUserAuthStore().authId
            newThreadData.publishedAt = 0,// date in seconds
            newThreadData.lastPostAt =    0,
            newThreadData.lastPostId =    '',
            newThreadData.posts =        [],
            newThreadData.publishedAt =   0,
            newThreadData.slug=          '',

            // add thread to threads
            this.threads.push(newThreadData)

            // add thread to the user
            const userAuthStore = UseUserAuthStore();
            const user = userAuthStore.authUser
            user?.UserThreads.push(newThreadData);

            // add thread id to the forum
            const forums = UseForumStore().forums;
            const getForum = findBySameId(forums, newThreadData.forumId)
            getForum?.threads?.push(newThreadData.id)

            // create the post
            const { createPost } = UsePostsStore();
            
            createPost({
                text: content,
                threadId: newThreadData.id,
                publishedAt: 0,
                userId: "",
                id: ""
            });
        },
        editThread(editThreadData:ThreadI, content:string){
            
            const findThreadToEdit = findBySameId(this.threads, editThreadData.id) as ThreadI
            findThreadToEdit.title = editThreadData.title

            // add thread to the user
            const userAuthStore = UseUserAuthStore();
            const user = userAuthStore.authUser

            const findPost = user?.UserPosts.find(post => post.threadId === editThreadData.id)

            

            const { editPost } = UsePostsStore();
            
            editPost({
                text: content,
                threadId: editThreadData.id,
                publishedAt: 0,
                userId: findPost?.userId as string,
                id: findPost?.id as string
            });
        }
    }
})