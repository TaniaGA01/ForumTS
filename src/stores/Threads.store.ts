import { defineStore } from "pinia";
import { ref } from "vue";
import sourceData from '@/data/data.json';
import type { ThreadI } from '@/data/data.interfaces'
import { UseUserAuthStore } from "./UserAuth.store";
import { UsePostsStore } from "./Posts.store";
import { UseForumStore } from "./Forums.store";

export const UseThreadsStore = defineStore('ThreadsStore', {
    state:() => {
        return{
            threads:ref<ThreadI[]>(sourceData.threads),
            threadId:''
        }
    },
    getters:{},
    actions:{
        // constructor
        createThread(newThreadData:ThreadI, content:string){
            newThreadData.contributors = [],
            newThreadData.firstPostId = '',
            newThreadData.userId = UseUserAuthStore().authId
            newThreadData.publishedAt = Math.floor(Date.now() / 1000),// date in seconds
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
            user?.Threads.push(newThreadData);

            // console.log('user', user)

            // add thread id to the forum
            const forums = UseForumStore().forums;
            const getForum = forums.find(forum => forum.id === newThreadData.forumId)
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
            
            const findThreadToEdit = this.threads.find(oldThread => oldThread.id === editThreadData.id) as ThreadI
            findThreadToEdit.title = editThreadData.title

            // add thread to the user
            const userAuthStore = UseUserAuthStore();
            const user = userAuthStore.authUser

            const findPost = user?.Posts.find(post => post.threadId === editThreadData.id)

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