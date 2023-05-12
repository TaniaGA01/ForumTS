<script setup lang="ts">
import type { PostI } from '@/data/data.interfaces'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UsePostsStore } from '@/stores/Posts.store'
import { UseUserStore } from '@/stores/Users.store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()

const { threadsData } = storeToRefs(UseThreadsStore())

const thread = threadsData.value.Thread(route.params.id as string)
const threadPosts = threadsData.value.ThreadPost(route.params.id as string)

const getUsers = UseUserStore()

const postsStore = UsePostsStore()
const addPost = (data: PostI): void => {
    const newPost = {
        ...data
    }
    postsStore.createPost(newPost)
}
</script>

<template>
    <div class="sm:flex justify-between mt-16">
        <div>
            <h1 class="text-4xl font-bold text-slate-700 uppercase">{{ thread.title }}</h1>
        </div>
        <div class="my-12 sm:block sm:my-0">
            <RouterLink :to="{ name: 'threadEditor', params: { id: thread.id } }"
            class="bg-violet-500 hover:bg-violet-600 text-white py-2 px-3 rounded-lg">
                Edit thread
            </RouterLink>   
        </div>
    </div>
    <PostsList :threadPosts="threadPosts" :users="getUsers.users" />
    <PostEditor @newPostData="addPost" />
</template>