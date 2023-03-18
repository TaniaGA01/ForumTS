<script setup lang="ts">
import type { ThreadI, PostI, UserI } from '../data/data.interfaces'
import sourceData from '../data/data.json'
import { ref } from 'vue';

const threads = ref<ThreadI[]>(sourceData.threads)
const posts = ref<PostI[]>(sourceData.posts)
const users = ref<UserI[]>(sourceData.users)

const postById = (postId: string) => {
    return posts.value.find(post => post.id === postId)
}
const userById = (userId: undefined | string) => {
    return users.value.find(user => user.id === userId)
}
</script>

<template>
    <div v-for="thread in threads" :key="thread.id">
        <h1 class="text-3xl uppercase mt-20">{{ thread.title }}</h1>
        <div v-for="postId in thread.posts" :key="postId">
            <div class="grid grid-cols-7 p-10 bg-slate-50 mt-3 shadow-md">
                <div class="col-span-2 grid place-items-center text-center">
                    <h4 class="text-xl font-semibold mb-5">{{ userById(postById(postId)?.userId)?.name }}</h4>
                    <img class="h-24 w-24 rounded-full" :src="userById(postById(postId)?.userId)?.avatar" />
                    <p class="text-sm font-semibold mp-5">Posts 123</p>

                </div>
                <div class="col-span-5">
                    <p>{{ postById(postId)?.text }}</p>
                    <p>{{ userById(postById(postId)?.userId)?.lastVisitAt }}</p>
                </div>
            </div>
        </div>
    </div>
</template>