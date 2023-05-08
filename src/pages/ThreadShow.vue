<script setup lang="ts">
import type { PostI } from '@/data/data.interfaces'
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { UseThreadsStore } from '@/stores/Threads.store'
import { UsePostsStore } from '@/stores/Posts.store'
import { UseUserStore } from '@/stores/Users.store'

const route = useRoute()

const threadsStore = UseThreadsStore()
const thread = computed(() => threadsStore.threads.find(thread => thread.id === route.params.id))

const postsStore = UsePostsStore()
const threadPosts = computed(() => postsStore.posts.filter(post => post.threadId === route.params.id))

const usersStore = UseUserStore()

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
            <h1 class="text-4xl font-bold text-slate-700 uppercase">{{ thread?.title }}</h1>
        </div>
        <div class="hidden sm:block">
            <RouterLink :to="{ name: 'threadEditor', params: { id: thread?.id } }"
            class="bg-violet-500 hover:bg-violet-600 text-white py-2 px-3 rounded-lg">
                Edit thread
            </RouterLink>   
        </div>
    </div>
    <PostsList :threadPosts="threadPosts" :users="usersStore.users" />
    <PostEditor @newPostData="addPost" />
</template>