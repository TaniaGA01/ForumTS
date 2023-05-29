import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ThreadI } from '@/data/data.interfaces'
import { UseUserAuthStore } from "./UserAuth.store";
import { UseForumStore } from "./Forums.store";
import { UsePostsStore } from '@/stores/Posts.store'
import { findBySameId, timestampfromServer } from "@/helpers";
import * as firestone from 'firebase/firestore';
import { db } from '@/data/api/dataBaseApi'
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
import router from "@/router";

// get asynchronic dataBase
const dataBaseServices = new DataBaseServices()
const threads = ref<ThreadI[]>(await dataBaseServices.getDataBase('threads'))

//Real-time database update order by published date
const dataBase = firestone.query(
    firestone.collection(db, 'threads'), 
    firestone.orderBy('publishedAt')
)
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
        async createThread(newThreadData:ThreadI, content:string){

            newThreadData.contributors = [UseUserAuthStore().authId],
            newThreadData.firstPostId = '',
            newThreadData.userId = UseUserAuthStore().authId
            newThreadData.publishedAt =  Math.floor(Date.now() / 1000),// date in seconds
            newThreadData.lastPostAt =   Math.floor(Date.now() / 1000),
            newThreadData.lastPostId =    '',
            newThreadData.posts =        [],
            newThreadData.slug=          ''

            //to create in database
            const batch = firestone.writeBatch(db)
            const threadsRef = firestone.doc(firestone.collection(db, "threads"))
            batch.set(
                threadsRef, 
                { ...newThreadData },
                timestampfromServer(newThreadData.publishedAt)
            )

            // add thread to the user
            const userRef = firestone.doc(db, "users", UseUserAuthStore().authId)
            batch.update(userRef, {
                UserThreads: firestone.arrayUnion(newThreadData)
            });

            // add thread id to the forum
            const forums = UseForumStore().forums;
            const getForum = findBySameId(forums, newThreadData.forumId)
            // getForum?.threads?.push(newThreadData.id)

            const forumRef = firestone.doc(db, "forums", getForum.id)
            batch.update(forumRef, {
                threads: firestone.arrayUnion(threadsRef.id)
            });

            //write all batch in database
            await batch.commit()

            // create first threads post
            const { createPost } = UsePostsStore();
            
            createPost({
                text: content,
                threadId: threadsRef.id,
                publishedAt: timestampfromServer(newThreadData.publishedAt),
                userId: '',
            });

            // create thread route
            router.push({ name : "threadShow", params:{ id: threadsRef.id } })

        },
        async editThread(editThreadData:ThreadI, content:string){
            
            const route = router.currentRoute.value.params.id

            const findThreadToEdit = findBySameId(this.threads, route) as ThreadI

            const thread = {...findThreadToEdit}

            //to create in database
            const batch = firestone.writeBatch(db)
            const threadsRef = firestone.doc(db, "threads", `${thread.id}`)

            batch.update(threadsRef, 
            {
                title: editThreadData.title
            }
            );
            
            //write all batch in database
            await batch.commit()

            // add thread to the user
            const userAuthStore = UseUserAuthStore();
            const user = userAuthStore.authUser

            const findPost = user?.UserPosts.find(post => post.threadId === thread.id)

            const { editPost } = UsePostsStore();
            
            editPost({
                text: content,
                threadId: thread.id,
                publishedAt: editThreadData.lastPostAt,
                userId: findPost?.userId as string,
                id: findPost?.id as string
            });

            router.push({ name : "threadShow", params:{ id: threadsRef.id } })
        }
    }
})