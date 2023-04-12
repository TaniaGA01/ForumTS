<script setup lang="ts">
import PostsList from '@/components/PostsList.vue'
import PostEditor from '@/components/PostEditor.vue';
import type { ThreadI, PostI, UserI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router'

const threads = reactive<ThreadI[]>(sourceData.threads)
const posts = reactive<PostI[]>(sourceData.posts)
const users = reactive<UserI[]>(sourceData.users)

const route = useRoute()
const thread = computed(() => threads.find(thread => thread.id === route.params.id));
const threadPosts = computed(() => posts.filter(post => post.threadId === route.params.id))

const addPost = (eventData: any): void => {
    const newPost = {
        ...eventData
    }
    posts.push(newPost)
    thread.value?.posts.push(newPost.id)
}

</script>

<template>
    <div>
        <h1 class="text-3xl uppercase mt-20 font-bold text-slate-600">{{ thread?.title }}</h1>
        <PostsList :threadPosts="threadPosts" :users="users" />
        <PostEditor @newPostData="addPost" />
    </div>
</template>