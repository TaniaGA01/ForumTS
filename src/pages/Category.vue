<script setup lang="ts">
import type { CategoryI } from '@/data/data.interfaces'
import { useRoute } from 'vue-router';
import { UseCategoriesStore } from '@/stores/Categories.store'
import { storeToRefs } from 'pinia';

const route = useRoute()

const {categoriesData} = storeToRefs(UseCategoriesStore())

const category = categoriesData.value.Category(route.params.id as string)
const categoryByForum = categoriesData.value.ForumByCategory

</script>
<template>
    <div>
        <h1 class="text-3xl mt-12 font-bold text-slate-600">{{ category?.name }}</h1>
        <hr class="mt-2 mb-12">
    </div>
    <ForumList 
    :forums="categoryByForum(category as CategoryI)"
    :title="category?.name"
    />
</template>