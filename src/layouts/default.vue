<script setup lang="ts">
import Header from '../layouts/global/Header.vue';
import Footer from '../layouts/global/Footer.vue';
</script>

<template>
    <Header />
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <slot />
    </div>
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <hr>
        <Footer class="mt-5"/>
    </div>
</template>
<style scoped></style>