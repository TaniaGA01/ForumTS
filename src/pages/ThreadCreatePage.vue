<script setup lang="ts">
import type { ThreadI } from '@/data/data.interfaces'
import ThreadEditor from '@/components/ThreadEditor.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { UseThreadsStore } from '@/stores/Threads.store'
import { UseForumStore } from '@/stores/Forums.store'

const route = useRoute()

const threadsStore = UseThreadsStore()
const forumStore = UseForumStore().forums

const forum = computed(() => forumStore.find(forum => forum.id === route.params.id));

let contentData = ref<string>('')

const text = (content: string): void =>{
    contentData = ref<string>(content)
}

const addThread = (data: ThreadI): void => {
    const newThread = {
        ...data
    }
    threadsStore.createThread(newThread, contentData.value)
}

</script>
<template>
    <div>
        <div>
            <h1 class="text-3xl mt-12 font-bold text-slate-600">
                Create new thread in <span class="text-5xl">{{ forum?.name }}</span>
            </h1>
            <hr class="mt-2 mb-12">
        </div>
        <ThreadEditor @content="text" @newThreadData = "addThread" />
    </div>
</template>