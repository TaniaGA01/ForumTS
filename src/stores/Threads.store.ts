import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ThreadI } from '@/data/data.interfaces'
import { UseUserAuthStore } from "./UserAuth.store";
import { UseForumStore } from "./Forums.store";
import { UsePostsStore } from '@/stores/Posts.store'
import { findBySameId } from "@/helpers";
import * as firestone from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'

const app = initializeApp(firebaseConfig);
const db:firestone.Firestore = firestone.getFirestore(app)
const threads = ref<ThreadI[]>([])

const dataBase = firestone.collection(db, 'threads')
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    return threads.value = dataBaseList.value;
});


export const UseThreadsStore = defineStore('ThreadsStore', {
    state:() => {
        return{
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
            newThreadData.publishedAt =  Math.floor(Date.now() / 1000),// date in seconds
            newThreadData.lastPostAt =   Math.floor(Date.now() / 1000),
            newThreadData.lastPostId =    '',
            newThreadData.posts =        [],
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
                publishedAt: Math.floor(Date.now() / 1000),
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
                publishedAt: editThreadData.lastPostAt,
                userId: findPost?.userId as string,
                id: findPost?.id as string
            });
        }
    }
})