<script setup lang="ts">
import type { ForumElementI, CategoryI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
const route = useRoute()

const forumsData = reactive<ForumElementI[]>(sourceData.forums)
const categories = reactive<CategoryI[]>(sourceData.categories)

const category1 = categories.find(category => category.id === route.params.id)

const getForumsForCategorie = (category:any) => {
    return forumsData.filter(forum => forum.categoryId === category.id)
}
</script>
<template>
    <div>
        <h1 class="text-3xl mt-12 font-bold text-slate-600">{{ category1?.name }}</h1>
        <hr class="mt-2 mb-12">
    </div>
    <ForumList 
    :forums="getForumsForCategorie(category1)"
    :title="category1?.name"
    />
</template>