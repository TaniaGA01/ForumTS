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
        createThread(threadData:ThreadI, content:string){
            threadData.contributors = [],
            threadData.firstPostId = '',
            threadData.userId = UseUserAuthStore().authId
            threadData.publishedAt = Math.floor(Date.now() / 1000),// date in seconds
            threadData.lastPostAt =    0,
            threadData.lastPostId =    '',
            threadData.posts =        [],
            threadData.publishedAt =   0,
            threadData.slug=          '',

            // add thread to threads
            this.threads.push(threadData)   

            // add thread to the user
            const userAuthStore = UseUserAuthStore();
            const user = userAuthStore.authUser
            user?.Threads.push(threadData);

            // add thread id to the forum
            const forums = UseForumStore().forums;
            const getForum = forums.find(forum => forum.id === threadData.forumId)
            getForum?.threads?.push(threadData.id)

            // create the post
            const { createPost } = UsePostsStore();
            
            createPost({
                text: content,
                threadId: threadData.id,
                publishedAt: 0,
                userId: "",
                id: ""
            });
        }
    }
})