<script setup lang="ts">
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import UserProfileCard from '@/components/UserPorfileCard.vue'
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue'
import type { UserAthI } from '@/data/data.interfaces'
import { storeToRefs } from 'pinia'

const props = defineProps<{
    edit: { 
        type:Boolean, 
        default:false 
    },
}>()

const { authUser } = storeToRefs(UseUserAuthStore());

</script>
<template>
    <div class="block sm:grid grid-flow-col gap-4 mt-12">
        <div class="row-span-1 ">
            <UserProfileCard v-if="!edit" :user="authUser as UserAthI" />
            <UserProfileCardEditor v-else :user="authUser as UserAthI" />
        </div>
        <div class="col-span-5">
            <div class="block sm:flex place-content-between mb-5">
                <h2 class="mb-5 sm:mb-0 text-slate-700 font-semibold text-2xl">{{ authUser?.username }}'s recent activity</h2>
                <RouterLink to="http://" 
                class="block bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">See only started threads?</RouterLink>
            </div>
            <hr class="mb-5">
            <div v-for="post in authUser?.UserPosts.slice().reverse()" :key="post.id" class="bg-white p-6 shadow mb-2 text-left">
                <div class="sm:flex">
                    <div class="sm:w-1/3 text-center">
                        <h3 class="text-fuchsia-600 text-center text-lg font-semibold mb-5">{{ authUser?.name }}</h3>
                        <div class="h-16 w-16 rounded-full inline-flex overflow-scroll justify-center items-center">
                            <img
                                :src="authUser?.avatar"
                                :alt="`${authUser?.name} profil picture`" />
                        </div>
                        <div class="mt-5">
                            <span class="text-slate-800">{{ authUser?.UserPosts.length }} posts</span>
                        </div>
                    </div>
                    <div class="sm:w-4/5 grid content-between">
                        <p class="break-all">{{ post.text }}</p>
                        <AppDate :timestamp="post.publishedAt"  class="text-slate-700 te"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>