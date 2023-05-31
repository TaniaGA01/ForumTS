
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { EditedI, PostI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import { findBySameId, replaceItem, timestampfromServer } from "@/helpers";
import * as firestone from 'firebase/firestore';
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
import { db } from '@/data/api/dataBaseApi'

// get asynchronic dataBase
const dataBaseServices = new DataBaseServices()
const posts = ref<PostI[]>(await dataBaseServices.getDataBase('posts'))

//Real-time database update order by published date
const dataBase = firestone.query(
    firestone.collection(db, 'posts'), 
    firestone.orderBy('publishedAt')
)
firestone.onSnapshot(dataBase, (querySnapshot) => {
    const dataBaseList = ref<any[]>([]);
    querySnapshot.forEach((doc) => {
        dataBaseList.value.push({ ...doc.data(), id: doc.id });
    });
    return posts.value = dataBaseList.value;
});


export const UsePostsStore = defineStore('PostsStore', {
    state:() => {
        return{
            posts: posts,
            threads:UseThreadsStore().threads,
        }
    },
    getters:{
        postsData:(state) => {
            const post = (route:string) => computed(() => 
                state.posts.find((post: { threadId: string; }) => post.threadId === route)
            )

            const postsByUser = (userId: string) => computed(() => 
                state.posts.filter((post: { userId: string; }) => post.userId === userId)
            ) 

            const threadsData = UseThreadsStore()
            const threads = (userId:string) => computed(() => 
                threadsData.threads.filter(thread => thread.userId === userId)
            )

            return{
                get Post(){
                    return post
                },
                get PostsByUser(){
                    return postsByUser
                },
                get ThreadsByUser(){
                    return threads
                }
            }
        }
    },
    actions:{
        async createPost(newPost:PostI){

            const editedData: EditedI = {
                at: Math.floor(Date.now() / 1000),// date in seconds, display in front
                by: UseUserAuthStore().authId,
                moderated: false,
            }
            newPost.edited = editedData
            newPost.userId = UseUserAuthStore().authId
            newPost.publishedAt = Math.floor(Date.now() / 1000),// date in seconds, display in front
            newPost.reactions = {}
            
            const thread = findBySameId(UseThreadsStore().threads, newPost.threadId)

            //to create in database
            const batch = firestone.writeBatch(db)
            const postRef = firestone.doc(firestone.collection(db, "posts"))
            batch.set(
                postRef, 
                { ...newPost },
                timestampfromServer(newPost.publishedAt)
            )

            const findThreadContributors = thread.contributors.map(
                (contributorId: string) => contributorId === UseUserAuthStore().authId
            )
            const findExistingContributor = findThreadContributors.findIndex(
                (i: boolean) => i === true
            )
            
            if(findExistingContributor === -1 ){ //if contributor does not existing

                //to update in database
                const threadRef = firestone.doc(db, "threads", thread?.id)
                batch.update(threadRef, {
                    contributors: firestone.arrayUnion(UseUserAuthStore().authId)
                });
            }

            //to update in database
            const threadRef = firestone.doc(db, "threads", thread?.id)
            batch.update(threadRef, {
                posts: firestone.arrayUnion(postRef.id)
            });

            //write all batch in database
            await batch.commit()

        },
        
        async updatePost(postEdit:PostI){

            console.log('postEdit', postEdit.id)
            
            const findPostToEdit = this.posts.find(
                oldPost => oldPost.id === postEdit.id && oldPost.threadId === postEdit.threadId
            ) as PostI

            const postToEdit = { ...findPostToEdit} 

            console.log('postToEdit', postToEdit)

            //to create in database            
            const batch = firestone.writeBatch(db)
            const postsRef = firestone.doc(db, "posts", `${postToEdit.id}`)
            batch.update(postsRef, {
                text: postEdit.text,
                edited:{
                    at: timestampfromServer(postEdit.publishedAt),
                    by: UseUserAuthStore().authId,
                    moderated:false
                }
            });

            //write all batch in database
            await batch.commit()
        }
    }
})