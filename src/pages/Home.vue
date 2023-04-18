<script setup lang="ts">
import type { CategoryI} from '@/data/data.interfaces'
import sourceData from '@/data/data.json'
import { reactive } from 'vue';

const categories = reactive<CategoryI[]>(sourceData.categories) as object

</script>

<template>
    <div class="grid justify-items-center my-20">
        <img src="@/images/logo-forum.svg" alt="" srcset="" width="130">
        <h1 class="text-6xl font-bold text-slate-600">Welcome to the Forum</h1>
    </div>
    <CategoryList :categories="categories"/>
</template>