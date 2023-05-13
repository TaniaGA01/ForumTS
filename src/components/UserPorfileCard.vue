<script setup lang="ts">
import type { UserAthI } from '@/data/data.interfaces'
const props = defineProps<{
    user: UserAthI,
}>()
console.log(props.user)
</script>
<template>
    <div class="bg-white grid place-content-center p-6 shadow">
        <div class="h-48 w-48 rounded-full inline-flex overflow-scroll justify-center items-center mb-5">
            <img class=""
                :src="user.avatar"
                :alt="`${user.name} profil picture`" />
        </div>
        <h3 class="text-slate-600 ml-2 text-center text-2xl font-semibold mb-10">{{ user.name }}</h3>
        <span class=" ml-2 uppercase font-semibold text-slate-600">{{ user.username }}</span>
        <span class="text-slate-800 ml-2 mt-5">{{ user.bio }}</span>
        <hr class="mt-5">
        <div class="flex place-content-between my-5">
            <span class="text-slate-800 ml-2">{{ props.user.UserPosts.length }} posts</span>
            <span class="text-slate-800 ml-2">{{ props.user.UserThreads.length }} threads</span>
        </div>
    </div>
    <div class="text-center mt-5">
        <small>Member since june 2003 <br/>last visited 4 hours ago</small>
        <RouterLink :to="{ name: 'userProfileEdit' }"
            class="block w-full bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mt-5">Edit profile
        </RouterLink>
    </div>
</template>