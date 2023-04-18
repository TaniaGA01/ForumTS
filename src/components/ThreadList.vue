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
            <ul role="list" class="divide-y-2 divide-gray-200">
                <li v-for="thread in threads" :key="thread.id">
                    <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <RouterLink :to="{ name: 'threadShow', params: { id: thread.id } }"
                                class="truncate text-lg font-medium bg-orange-50 text-orange-600 border-orange-200 border py-0.5 px-1.5 rounded-md hover:bg-orange-100">
                                {{ thread.title }}
                            </RouterLink>
                        </div>
                        <hr class="mt-2 border-dotted">
                        <div class="mt-2 sm:flex sm:justify-between align-text-top">
                            <div class="sm:flex">
                                <p class="flex items-center  text-gray-500">
                                    <UserCircleIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    Par :
                                    <a href="#" 
                                    class="bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200 border py-0.5 px-1.5 rounded-md ml-2
                                    hover:bg-fuchsia-100">
                                        <small>{{ userById(thread.userId)?.name }}</small>
                                    </a>
                                </p>
                                <p class="mt-2 flex items-center  text-gray-500 sm:mt-0 sm:ml-6">
                                    <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <AppDate :timestamp="thread.publishedAt" />
                                </p>
                            </div>
                            <div class="mt-2 flex items-center  text-gray-500 sm:mt-0 w-2/5">
                                <p
                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 sm:mr-5">
                                    <ArrowUturnRightIcon class="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                    <timz>{{ thread.posts.length }} replies</timz>
                                </p>
                                <img :src="userById(thread.userId)?.avatar" class="h-10 w-10 rounded-full mr-2" />
                                <div class="grid">
                                    <a href="#" class="bg-violet-50 text-violet-600 border-violet-200 border py-0.5 px-1.5 rounded-md ml-2
                                    hover:bg-violet-100">
                                        <small>
                                            {{ userById(thread.userId)?.name }}
                                        </small>
                                    </a>
                                    <AppDate :timestamp="thread.publishedAt" class="ml-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>