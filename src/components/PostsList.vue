<script setup lang="ts">
import { PencilIcon } from '@heroicons/vue/24/outline'
import type { UserI, PostI } from '@/data/data.interfaces'
import { findBySameId } from "@/helpers";
import { UsePostsStore } from "@/stores/Posts.store"
import {UseUserAuthStore } from '@/stores/UserAuth.store'
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import PostEditor from './PostEditor.vue';

const props = defineProps<{
    threadPosts: PostI[],
    users: UserI[],
    posts: PostI[]
}>()

const editing = reactive({
    id : null,
})

const userById = (userId: string) => {
    return findBySameId(props.users, userId)
}

const { postsData } = storeToRefs(UsePostsStore())
const postsStore = UsePostsStore()

const usersAuthStore = UseUserAuthStore()


const toggleEditMode = (id: null) => {
    editing.id = id === editing.id ? null : id
}

const editPost = (data: PostI): void => {
    const updatePost = {
        ...data,
    }
    postsStore.updatePost(updatePost)
    editing.id = null
}

</script>
<template>
    <div v-for="threadPost in props.threadPosts" :key="threadPost.threadId">
        <div class="grid grid-cols-7 p-10 bg-white mt-3 shadow-md">
            <div class="col-span-2 grid place-items-center text-center">
                <div class="grid justify-items-center">
                    <h4 class="text-xl font-semibold mb-5 text-slate-700">{{ userById(threadPost.userId)?.name }}</h4>
                    <img class="h-24 w-24 rounded-full" :src="userById(threadPost.userId)?.avatar" />
                   <div class="mt-4">
                        <p class="text-sm font-semibold mp-5 text-slate-700 uppercase">
                            <span class="font-semibold text-xl">{{ postsData.PostsByUser(threadPost.userId).value.length }}</span> Posts
                        </p>
                        <p class="text-sm font-semibold mp-5 text-slate-700 uppercase">
                            <span class="font-semibold text-xl">{{ postsData.ThreadsByUser(threadPost.userId).value.length }} </span> Theads
                        </p>
                   </div>
                </div>
            </div>
            <div class="col-span-5 grid content-between">
                <div>
                    <div class="w-full text-right mb-3">
                        <button v-if="threadPost.userId === usersAuthStore.authId"
                        @click.prevent="toggleEditMode(threadPost.id as any)"
                        class="w-fit inline-flex bg-fuchsia-100 p-2 rounded-full text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white">
                            <PencilIcon class="h-4"/>
                        </button>
                    </div>
                    <PostEditor 
                    :postText="threadPost.text"
                    :postId="threadPost.id"
                    @updatePostData="editPost"
                    v-if="editing.id === threadPost.id" />
                    <p v-else class="break-all text-slate-700">{{ threadPost.text }}</p>
                </div>

                <div class="text-right break-all text-slate-600 bottom-0 relative block">
                    <small  
                        v-if="threadPost.edited?.at"
                        class="text-right text-slate-400">Edited
                    </small>
                    <br>
                    <AppDate :timestamp="threadPost.publishedAt" class="text-slate-700"/>
                </div>
            </div>
        </div> 
    </div>
</template>