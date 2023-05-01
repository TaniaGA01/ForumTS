<script setup lang="ts">
import { useRoute } from 'vue-router'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UsePostsStore } from '@/stores/Posts.store'
import { UseUserStore } from '@/stores/Users.store'
import type { ThreadI, PostI } from '@/data/data.interfaces'

const route = useRoute()

const usersStore = UseUserStore()
const user = usersStore.authUser()

const threadsStore = UseThreadsStore()
const userThread:ThreadI[] = threadsStore.threads.filter(thread => thread.userId === user?.id)

const postsStore = UsePostsStore()
const userPosts:PostI[] = postsStore.posts.filter(post => post.userId === user?.id)

</script>
<template>
    <div class="grid grid-flow-col gap-4 mt-12">
        <div class="row-span-1 ">
            <div class="bg-white grid place-content-center p-6 shadow">
                <div class="h-48 w-48 rounded-full inline-flex overflow-scroll justify-center items-center mb-5">
                    <img class=""
                        :src="user?.avatar"
                        :alt="`${user?.name} profil picture`" />
                </div>
                <h3 class="text-slate-600 ml-2 text-center text-2xl font-semibold mb-10">{{ user?.name }}</h3>
                <span class="text-slate-800 ml-2">{{ user?.username }}</span>
                <span class="text-slate-800 ml-2">{{ user?.bio }}</span>
                <div class="flex place-content-between mt-9 mb-5">
                    <span class="text-slate-800 ml-2">{{ userPosts.length }} posts</span>
                    <span class="text-slate-800 ml-2">{{ userThread.length }} threads</span>
                </div>
                <hr>
            </div>
            <div class="text-center mt-5">
                <small>Member since june 2003 <br/>last visited 4 hours ago</small>
                <button
                    class="block w-full bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mt-5">Edit profile
                </button>
            </div>
        </div>
        <div class="col-span-5">
            <div class="flex place-content-between mb-5">
                <h2 class="text-slate-700 font-semibold text-2xl">{{ user?.name }}'s recent activity</h2>
                <RouterLink to="http://" 
                class="block bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">See only started threads?</RouterLink>
            </div>
            <hr class="mb-5">
            <div v-for="post in userPosts" :key="post.id" class="bg-white p-6 shadow mb-2 text-left">
                <div class="flex">
                    <div class="w-1/3 text-center">
                        <h3 class="text-fuchsia-600 text-center text-lg font-semibold mb-5">{{ user?.name }}</h3>
                        <div class="h-16 w-16 rounded-full inline-flex overflow-scroll justify-center items-center">
                            <img
                                :src="user?.avatar"
                                :alt="`${user?.name} profil picture`" />
                        </div>
                        <div class="mt-5">
                            <span class="text-slate-800">{{ userPosts.length }} posts</span>
                        </div>
                    </div>
                    <div class="w-4/5 grid content-between">
                        <p class="break-all">{{ post.text }}</p>
                        <p class="text-right text-sm text-slate-500">9 months ago</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>