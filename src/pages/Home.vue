<script setup lang="ts">
import { UseCategoriesStore } from '@/stores/Categories.store';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, ref } from 'vue';
import type { CategoryI } from '@/data/data.interfaces';

let ready:boolean = true

const { categories } = storeToRefs(UseCategoriesStore())
const allCategories = ref<CategoryI[]>([])

const showToggle = () => {
    setTimeout(() => {
        allCategories.value = categories.value
        ready = false
    }, 3000)
}

onBeforeMount(() => {
    categories.value.length ? showToggle() : ready = true
});
</script>

<template>
    <div class="grid justify-items-center my-20">
        <img src="@/images/logo-forum.svg" alt="" srcset="" width="130">
        <h1 class="text-6xl font-bold text-slate-600 text-center">Welcome to the Forum</h1>
    </div>
    <p v-if="ready === true" >loading</p>
    <CategoryList :categories="allCategories"/>
</template>