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

const addPost = (eventData: PostI): void => {
    const newPost = {
        ...eventData
    }
    postsStore.createPost(newPost)
}
</script>

<template>
    <div>
        <h1 class="text-3xl mt-12 font-bold text-slate-600">{{ thread?.title }}</h1>
        <hr class="mt-2 mb-12">
    </div>
    <PostsList :threadPosts="threadPosts" :users="usersStore.users" />
    <PostEditor @newPostData="addPost" />
</template>