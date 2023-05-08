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

const editThread = (data: ThreadI): void => {
    const newThread = {
        ...data
    }
    threadsStore.editThread(newThread, contentData.value)
}

</script>
<template>
    <div>
        <ThreadEditor @content="text" @newThreadData = "editThread" />
    </div>
</template>