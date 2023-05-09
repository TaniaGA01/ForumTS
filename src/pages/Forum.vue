<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/20/solid'
import type { ForumElementI, ThreadI, UserI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { reactive,computed } from 'vue';
import { useRoute } from 'vue-router';
import { findBySameId } from "@/helpers";

const forumsData = reactive<ForumElementI[]>(sourceData.forums)
const threadsData = reactive<ThreadI[]>(sourceData.threads)
const users = reactive<UserI[]>(sourceData.users)


const route = useRoute()
const forum = computed(() => findBySameId(forumsData, route.params.id));
const threads = computed(() => threadsData.filter(thread => thread.forumId === route.params.id))

const breadcrumbs = [
    {
        id:1,
        name:'Home',
        href:'/'
    },
    {
        id:2,
        name:'Discussion',
        href:'#'
    },
    {
        id:3,
        name:forum.value?.name,
        href:'#'
    },
]
</script>
<template>
    <div class="mt-12">
        <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4">
            <ol role="list" class="flex items-center space-x-4">
                <HomeIcon class="w-5"/>
            <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.id">
                <div class="flex items-center">
                <a :href="breadcrumb.href" class="mr-4 text-sm font-medium text-gray-900">
                    {{ breadcrumb.name }}
                </a>
                <svg viewBox="0 0 6 20" aria-hidden="true" class="h-5 w-auto text-gray-300">
                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
                </div>
            </li>
            </ol>
        </nav>
    </div>
    <div class="sm:flex justify-between mt-16">
        <div>
            <h1 class="text-4xl font-bold text-slate-700 uppercase">{{ forum?.name }}</h1>
        </div>
        <div class="hidden sm:block">
            <RouterLink :to="{ name: 'threadCreator', params: { id: forum?.id } }"
            class="bg-violet-500 hover:bg-violet-600 text-white py-2 px-3 rounded-lg">
                Start a thread
            </RouterLink>   
        </div>
    </div>
    <hr class="m-2">
    <h2 class="text-xl text-slate-500 sm:mb-16">{{ forum?.description }}</h2>
    <div class="block sm:hidden my-12">
        <RouterLink :to="{ name: 'threadCreator', params: { id: forum?.id } }"
            class="bg-violet-500 hover:bg-violet-600 text-white py-2 px-3 rounded-lg">
                Start a thread
        </RouterLink>  
    </div>
    <ThreadList :threads="threads" :users="users" />
</template>