import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { EditedI, PostI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import { findBySameId, replaceItem } from "@/helpers";
import DataBaseServices from '@/data/api/dataBaseApi.helpers'
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
            const post = (route:string) => computed(() => state.posts.find(post => post.threadId === route))

            const postsByUser = (userId: string) => computed(() => state.posts.filter(post => post.userId === userId)) 

            const threadsData = UseThreadsStore()
            const threads = (userId:string) => computed(() => threadsData.threads.filter(thread => thread.userId === userId))

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

            const userAuthStore = UseUserAuthStore();

            const findThreadContributors = thread.contributors.map((contributorId: string) => contributorId === userAuthStore.authUser?.id)
            const findExistingContributor = findThreadContributors.findIndex((i: boolean) => i === true)

            if(findExistingContributor === -1 ){ //not existing
                thread?.contributors.push(UseUserAuthStore().authId)
            }

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