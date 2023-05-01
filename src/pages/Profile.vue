<script setup lang="ts">
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import UserProfileCard from '@/components/UserPorfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'

const usersStore = UseUserAuthStore()
const user = usersStore.authUser

</script>
<template>
    <div class="grid grid-flow-col gap-4 mt-12">
        <div class="row-span-1 ">
            <!-- <UserProfileCard :userData="user?.UserInfo" :userThread="user?.Threads" :userPosts="user?.Posts"/> -->
            <UserProfileCardEditor 
                :userData="user?.UserInfo" 
                :userThread="user?.Threads" 
                :userPosts="user?.Posts"
            />
        </div>
        <div class="col-span-5">
            <div class="flex place-content-between mb-5">
                <h2 class="text-slate-700 font-semibold text-2xl">{{ user?.UserInfo.name }}'s recent activity</h2>
                <RouterLink to="http://" 
                class="block bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">See only started threads?</RouterLink>
            </div>
            <hr class="mb-5">
            <div v-for="post in user?.Posts" :key="post.id" class="bg-white p-6 shadow mb-2 text-left">
                <div class="flex">
                    <div class="w-1/3 text-center">
                        <h3 class="text-fuchsia-600 text-center text-lg font-semibold mb-5">{{ user?.UserInfo.name }}</h3>
                        <div class="h-16 w-16 rounded-full inline-flex overflow-scroll justify-center items-center">
                            <img
                                :src="user?.UserInfo.avatar"
                                :alt="`${user?.UserInfo.name} profil picture`" />
                        </div>
                        <div class="mt-5">
                            <span class="text-slate-800">{{ user?.Posts.length }} posts</span>
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