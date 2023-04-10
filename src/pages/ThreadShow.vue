<script setup lang="ts">
import PostsList from '@/components/PostsList.vue'
import type { ThreadI, PostI, UserI, EditedI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'

const threads = reactive<ThreadI[]>(sourceData.threads)
const posts = reactive<PostI[]>(sourceData.posts)
const users = reactive<UserI[]>(sourceData.users)

const route = useRoute()
const thread = computed(() => threads.find(thread => thread.id === route.params.id));
const threadPosts = computed(() => posts.filter(post => post.threadId === route.params.id))

let newPostText = ''

const addPost = (): void => {
    const newPostId = "abc" + Math.random()
    const editedData: EditedI = {
        at: 0,
        by: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
        moderated: false,
    }
    const newPost: PostI = reactive({
        edited: editedData,
        id: newPostId,
        publishedAt: Math.floor(Date.now() / 1000),// date in seconds
        text: newPostText,
        threadId: route.params.id as string,
        userId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
        reactions: undefined
    }
    )
    posts.push(newPost)
    thread.value?.posts.push(newPostId)
    newPostText = ''
}
</script>

<template>
    <div>
        <h1 class="text-3xl uppercase mt-20 font-bold text-slate-600">{{ thread?.title }}</h1>
        <PostsList :threadPosts="threadPosts" :users="users" />
        <div class="bg-white mt-3 shadow-md">
            <Form @submit.prevent="addPost" method="POST" class="mx-auto mt-16 max-w-2xl sm:mt-5 py-20">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div class="sm:col-span-2">
                        <label for="message" class="block text-sm font-semibold leading-6 text-slate-900">Your
                            comment</label>
                        <div class="mt-2.5">
                            <textarea v-model="newPostText" name="message" id="message" rows="4"
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
                <div class="mt-10">
                    <button
                        class="block w-full rounded-md bg-fuchsia-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600">Add
                        your comment</button>
                </div>
            </Form>
        </div>


    </div>
</template>