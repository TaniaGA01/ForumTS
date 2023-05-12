<script setup lang="ts">
import type { CategoryI } from '@/data/data.interfaces'
import { UseCategoriesStore } from '@/stores/Categories.store';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    categories: CategoryI[],
}>()

const {categoriesData} = storeToRefs(UseCategoriesStore())
const categoryByForum = categoriesData.value.ForumByCategory

</script>
<template>
    <ForumList 
    v-for="category in props.categories" :key="category?.id"
    :forums="categoryByForum(category)"
    :title="category?.name"
    :category-id="category?.id"
    />
</template>
