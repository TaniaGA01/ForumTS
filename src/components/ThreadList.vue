<script setup lang="ts">
import { CalendarIcon, ArrowUturnRightIcon, UserCircleIcon } from '@heroicons/vue/20/solid'
const props = defineProps({
    threads: Object,
    posts: Object,
    users: Object
});
const userById = (userId: undefined | string) => {
    return props.users?.find((user: { id: string | undefined; }) => user.id === userId)
}
</script>
<template>
    <div>
        <h2 class="text-xl bg-fuchsia-800 py-5 px-7 text-white uppercase rounded-t-lg font-semibold">Threads</h2>
        <div class="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="thread in threads" :key="thread.id">
                    <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <RouterLink :to="{ name: 'threadShow', params: { id: thread.id } }"
                                class="truncate text-xl  text-fuchsia-800 font-semibold">
                                {{ thread.title }}
                            </RouterLink>
                            <div class="ml-2 flex flex-shrink-0">
                                <p
                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    <ArrowUturnRightIcon class="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                    <timz>{{ thread.posts.length }} replies</timz>
                                </p>
                            </div>
                        </div>
                        <hr class="mt-2 border-dotted">
                        <div class="mt-2 sm:flex sm:justify-between align-text-top">
                            <div class="sm:flex">
                                <p class="flex items-center  text-gray-500">
                                    <UserCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    Par :
                                    <a href="#" class="block hover:bg-gray-50 ml-1">
                                        {{ userById(thread.userId)?.name }}
                                    </a>
                                </p>
                                <p class="mt-2 flex items-center  text-gray-500 sm:mt-0 sm:ml-6">
                                    <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />

                                    <time>{{ thread.publishedAt }}</time>
                                </p>
                            </div>
                            <div class="mt-2 flex items-center  text-gray-500 sm:mt-0 w-60">
                                <img :src="userById(thread.userId)?.avatar" class="h-10 w-10 rounded-full mr-2" />
                                <div class="grid">
                                    <a href="#"><small>{{ userById(thread.userId)?.name }}</small></a>
                                    <time>{{ thread.publishedAt }}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>