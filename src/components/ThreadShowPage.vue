<script setup lang="ts">
import type { ThreadI, PostI, UserI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router'

const threads = reactive<ThreadI[]>(sourceData.threads)
const posts = reactive<PostI[]>(sourceData.posts)
const users = reactive<UserI[]>(sourceData.users)


const postById = (postId: string) => {
    return posts.find(post => post.id === postId)
}
const userById = (userId: undefined | string) => {
    return users.find(user => user.id === userId)
}
const route = useRoute()
const thread = computed(() => threads.find(thread => thread.id === route.params.id));
</script>

<template>
    <div>
        <h1 class="text-3xl uppercase mt-20 font-bold text-slate-600">{{ thread?.title }}</h1>
        <div v-for="postId in thread?.posts" :key="postId">
            <div class="grid grid-cols-7 p-10 bg-white mt-3 shadow-md">
                <div class="col-span-2 grid place-items-center text-center">
                    <h4 class="text-xl font-semibold mb-5">{{ userById(postById(postId)?.userId)?.name }}</h4>
                    <img class="h-24 w-24 rounded-full" :src="userById(postById(postId)?.userId)?.avatar" />
                    <p class="text-sm font-semibold mp-5">Posts 123</p>

                </div>
                <div class="col-span-5 relative">
                    <p class="break-all">{{ postById(postId)?.text }}</p>
                    <div class="text-right absolute bottom-0 right-0">
                        <small class="break-all text-slate-600">
                            {{
                                postById(postId)?.publishedAt
                            }}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>