<script setup lang="ts">
import type { ForumElementI, CategoryI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { useRoute } from 'vue-router';
import { computed, reactive } from 'vue';
const route = useRoute()

const forumsData = reactive<ForumElementI[]>(sourceData.forums)
const forum = computed(() => forumsData.find(forum => forum.id === route.params.id));

import ThreadEditor from '@/components/ThreadEditor.vue';
</script>
<template>
    <div>
        <div>
            <h1 class="text-3xl mt-12 font-bold text-slate-600">
                Create new thread in <span class="text-5xl">{{ forum?.name }}</span>
            </h1>
            <hr class="mt-2 mb-12">
        </div>
        <ThreadEditor/>
    </div>
</template>