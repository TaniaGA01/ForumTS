<script setup lang="ts">
import { UseCategoriesStore } from '@/stores/Categories.store';
import { storeToRefs } from 'pinia';
const { categories } = storeToRefs(UseCategoriesStore())
</script>

<template>
    <div class="grid justify-items-center my-20">
        <img src="@/images/logo-forum.svg" alt="" srcset="" width="130">
        <h1 class="text-6xl font-bold text-slate-600">Welcome to the Forum</h1>
    </div>
    <CategoryList :categories="categories"/>
</template>