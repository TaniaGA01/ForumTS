<script setup lang="ts">
import { UsersIcon, UserGroupIcon, ChatBubbleLeftRightIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/outline'
</script>
<template>
    <div class="block sm:flex gap-12 place-content-center">
        <div class="flex ">
            <UsersIcon class="w-6 mr-3 text-slate-400"/><span class="text-slate-700">47 users online</span>
        </div>
        <div class="flex">
            <UserGroupIcon class="w-6 mr-3 text-slate-400"/><span class="text-slate-700">497 users registered</span>
        </div>
        <div class="flex">
            <ChatBubbleLeftRightIcon class="w-6 mr-3 text-slate-400"/><span class="text-slate-700">49 threads</span>
        </div>
        <div class="flex">
            <ChatBubbleLeftEllipsisIcon class="w-6 mr-3 text-slate-400"/><span class="text-slate-700">763 posts</span>
        </div>
    </div>
</template>