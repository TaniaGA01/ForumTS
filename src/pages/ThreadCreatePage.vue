<script setup lang="ts">
import type { ThreadI } from '@/data/data.interfaces'
import ThreadEditor from '@/components/ThreadEditor.vue';
import { ref } from 'vue';
import { UseThreadsStore } from '@/stores/Threads.store'

const threadsStore = UseThreadsStore()

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
        <ThreadEditor @content="text" @newThreadData = "addThread" />
    </div>
</template>