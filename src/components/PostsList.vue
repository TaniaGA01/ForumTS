<script setup lang="ts">

const props = defineProps({
    threadPosts: Object,
    users: Object
});

const userById = (userId: undefined | string) => {
    return props.users?.find((user: { id: string | undefined; }) => user.id === userId)
}

</script>
<template>
    <div v-for="threadPost in props.threadPosts" :key="threadPost.threadId">
        <div class="grid grid-cols-7 p-10 bg-white mt-3 shadow-md">
            <div class="col-span-2 grid place-items-center text-center">
                <h4 class="text-xl font-semibold mb-5">{{ userById(threadPost.userId)?.name }}</h4>
                <img class="h-24 w-24 rounded-full" :src="userById(threadPost.userId)?.avatar" />
                <p class="text-sm font-semibold mp-5">Posts 123</p>
            </div>
            <div class="col-span-5">
                <p class="break-all">{{ threadPost.text }}</p>
                <div class="text-right mt-5">
                    <small class="break-all text-slate-600">
                        {{ threadPost.publishedAt }}
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>