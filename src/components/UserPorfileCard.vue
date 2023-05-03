<script setup lang="ts">
import type { UserI, ThreadI, PostI } from '@/data/data.interfaces'
const props = defineProps<{
    userThread: ThreadI[]
    userPosts: PostI[],
    userData: UserI
}>()
</script>
<template>
    <div class="bg-white grid place-content-center p-6 shadow">
        <div class="h-48 w-48 rounded-full inline-flex overflow-scroll justify-center items-center mb-5">
            <img class=""
                :src="props.userData?.avatar"
                :alt="`${props.userData?.name} profil picture`" />
        </div>
        <h3 class="text-slate-600 ml-2 text-center text-2xl font-semibold mb-10">{{ props.userData?.name }}</h3>
        <span class="text-slate-800 ml-2">{{ props.userData?.username }}</span>
        <span class="text-slate-800 ml-2">{{ props.userData?.bio }}</span>
        <div class="flex place-content-between mt-9 mb-5">
            <span class="text-slate-800 ml-2">{{ props.userPosts?.length }} posts</span>
            <span class="text-slate-800 ml-2">{{ props.userThread?.length }} threads</span>
        </div>
        <hr>
    </div>
    <div class="text-center mt-5">
        <small>Member since june 2003 <br/>last visited 4 hours ago</small>
        <button
            class="block w-full bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mt-5">Edit profile
        </button>
    </div>
</template>