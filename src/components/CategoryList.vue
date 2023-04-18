<script setup lang="ts">
import type { ForumElementI } from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { reactive } from 'vue';
const forumsData = reactive<ForumElementI[]>(sourceData.forums)

const props = defineProps({
    categories: Object,
});

const getForumsForCategorie = (category:any) => {
    return forumsData.filter(forum => forum.categoryId === category.id)
}

</script>
<template>
    <ForumList 
    v-for="category in props.categories" :key="category?.id"
    :forums="getForumsForCategorie(category)"
    :title="category?.name"
    :category-id="category?.id"
    />
</template>
