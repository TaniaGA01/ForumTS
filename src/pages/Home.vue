<script setup lang="ts">
import { UseCategoriesStore } from '@/stores/Categories.store';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import type { CategoryI } from '@/data/data.interfaces';

const { categories } = storeToRefs(UseCategoriesStore())
const allCategories = ref<CategoryI[]>([])

let ready:boolean = true
const hidePreloader = () => {
    setTimeout(() => {
        allCategories.value = categories.value
        ready = false
    }, 500)
}
onBeforeMount(() => {
    categories.value.length ? hidePreloader() : ready = true
});

</script>

<template>
    <div class="grid justify-items-center my-20">
        <img src="@/images/logo-forum.svg" alt="" srcset="" width="130">
        <h1 class="text-6xl font-bold text-slate-600 text-center">Welcome to the Forum</h1>
    </div>
    <Preloader v-show="ready === true" />
    <CategoryList :categories="allCategories"/>
</template>