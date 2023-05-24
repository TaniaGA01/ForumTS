
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { EditedI, PostI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import { findBySameId, replaceItem, timestampfromServer } from "@/helpers";
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
import { db } from "@/data/api/dataBaseApi";
import * as firestone from 'firebase/firestore';

const dataBaseServices = new DataBaseServices()
const posts = reactive<PostI[]>(await dataBaseServices.getDataBase('posts'))


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

            const userAuthStore = UseUserAuthStore();

            const findThreadContributors = thread.contributors.map(
                (contributorId: string) => contributorId === userAuthStore.authUser?.id
            )
            const findExistingContributor = findThreadContributors.findIndex(
                (i: boolean) => i === true
            )

            this.posts.push(newPost) //display in front

            //to create in database
            const batch = firestone.writeBatch(db)
            const postRef = firestone.doc(firestone.collection(db, "posts"))
            batch.set(
                postRef, 
                { ...newPost },
                timestampfromServer(newPost.publishedAt)
            )
            
            if(findExistingContributor === -1 ){ //if contributor does not existing
                thread?.contributors.push(UseUserAuthStore().authId) //display in front

                //to update in database
                const threadRef = firestone.doc(db, "threads", thread?.id)
                batch.update(threadRef, {
                    contributors: firestone.arrayUnion(UseUserAuthStore().authId)
                });
            }

            thread?.posts.push(newPost.id) //display in front

            //to update in database
            const threadRef = firestone.doc(db, "threads", thread?.id)
            batch.update(threadRef, {
                posts: firestone.arrayUnion(postRef.id)
            });

            //write in database
            await batch.commit()

        },
        
        editPost(postEdit:PostI){

            const findPostToEdit = this.posts.find(
                (oldPost: { threadId: string; }) => oldPost.threadId === postEdit.threadId
            ) as PostI
            
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