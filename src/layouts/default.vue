<script setup lang="ts">
import Header from '../layouts/global/Header.vue';
</script>

<template>
    <Header />
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div class="mx-auto max-w-3xl">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>