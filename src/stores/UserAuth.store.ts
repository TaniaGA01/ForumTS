import { defineStore } from "pinia";
import { reactive } from "vue";
import type { PostI, ThreadI, UserI } from '@/data/data.interfaces'
import { UseThreadsStore } from "./Threads.store";
import { UsePostsStore } from "./Posts.store";
import { UseUserStore } from "@/stores/Users.store"

export const UseUserAuthStore = defineStore('UserAuthStore', {
    state:() => {
        const allUsers = UseUserStore()
        return{
            users:reactive<UserI[]>(allUsers.users),
            // authId: 'jVa6Go6Nl1Urkag1R2p9CHTf4ny1'
            authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
        }
    },
    getters:{
        authUser: (state) => {
            const user =  state.users.find( user => user.id === state.authId)
            if(!user) return null

            const threadsStore = UseThreadsStore()
            const postsStore = UsePostsStore()

            return{
                // ...user,
                get UserInfo(){
                    return user as UserI
                },

                get Threads(){
                    return threadsStore.threads.filter(thread => thread.userId === user.id) as ThreadI[]
                },

                get Posts(){
                    return postsStore.posts.filter(post => post.userId === user.id) as PostI[]
                }
            }
        }
    },
    actions:{
        editUser(user:UserI){
            const findUser = this.users.map(oldUser => oldUser.id === user.id)
            const findUserIndex = findUser.findIndex(i => i === true) 
            this.users.splice(findUserIndex, 1, user)

            console.log('updated users', this.users)
        }
    }
})