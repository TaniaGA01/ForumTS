import { defineStore } from "pinia";
import type { PostI, ThreadI, UserI, UserAthI } from '@/data/data.interfaces'
import { UseThreadsStore } from "./Threads.store";
import { UsePostsStore } from "./Posts.store";
import { UseUserStore } from "@/stores/Users.store"
import { findBySameId, replaceItem } from "@/helpers";

export const UseUserAuthStore = defineStore('UserAuthStore', {
    state:() => {
        const allUsers = UseUserStore()
        return{
            users: allUsers.users,
            // authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
            // authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
            authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
        }
    },
    getters:{
        authUser: (state) => {
            const user =  findBySameId(state.users, state.authId) as UserI | UserAthI
            if(!user) return null

            const threadsStore = UseThreadsStore()
            const postsStore = UsePostsStore()

            const userThreads = threadsStore.threads.filter(thread => thread.userId === user.id) as ThreadI[]
            const userPosts = postsStore.posts.filter(post => post.userId === user.id) as PostI[]

            return{
                ...user,
                get UserThreads(){
                    return userThreads
                },
                get UserPosts(){
                    return userPosts
                }
            }
        }
    },
    actions:{
        editUser(activeUser:UserI){
            replaceItem(this.users, activeUser.id, activeUser)
        }
    }
})