<script setup lang="ts">
import ThreadList from '@/components/ThreadList.vue';
import type { ThreadI, PostI, UserI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { reactive } from 'vue';

const threads = reactive<ThreadI[]>(sourceData.threads)
const posts = reactive<PostI[]>(sourceData.posts)
const users = reactive<UserI[]>(sourceData.users)

</script>

<template>
    <div class="grid justify-items-center my-20">
        <img src="@/images/logo-forum.svg" alt="" srcset="" width="130">
        <h1 class="text-6xl font-bold text-slate-600">Welcome to the Forum</h1>
    </div>
    <ThreadList :threads="threads" :posts="posts" :users="users" />
</template>