<script setup lang="ts">
import { ArrowUturnRightIcon } from '@heroicons/vue/20/solid'
import type { ForumElementI } from '@/data/data.interfaces'

const props = defineProps<{
    forums: ForumElementI[],
    title: string,
    categoryId: string
}>()

const forumThreadWord = (forum: ForumElementI) => {
    if (forum.threads?.length) {
        return forum.threads.length as number > 1 ? `threads` : `thread`
    } else {
        return  `No threads`
    }
}

</script>
<template>
    <RouterLink v-if="props.categoryId" :to="{name:'category', params:{id: props.categoryId}}" >
        <h2 class="text-xl bg-fuchsia-800 hover:bg-fuchsia-700 py-5 px-7 text-white uppercase rounded-t-lg font-semibold mt-10">
            {{ props.title }}
        </h2>
    </RouterLink>
    <h2 v-else class="text-xl bg-fuchsia-800 py-5 px-7 text-white uppercase rounded-t-lg font-semibold mt-10">
            Threads
        </h2>
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y-2 divide-gray-200">
            <li v-for="forum in props.forums" :key="forum.id">
                <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                        <RouterLink :to="{ name: 'Forum', params: { id: forum.id } }"
                            class="bg-orange-50 text-orange-600 border-orange-200 border py-0.5 px-1.5 rounded-md
                                hover:bg-orange-100">
                            {{ forum.name }}
                        </RouterLink>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between align-text-top">
                        <div class="sm:flex">
                            <p class="text-slate-500">{{ forum.description }}</p>
                        </div>
                        <div class="mt-2 flex items-center  text-gray-500 sm:mt-0 w-1/3">
                            <p
                                class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 sm:mr-5">
                                <ArrowUturnRightIcon class="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                <span>{{ forum.threads?.length }} {{ forumThreadWord(forum) }}</span>
                            </p>
                            <!-- <img :src="userById(thread.userId)?.avatar" class="h-10 w-10 rounded-full mr-2" />
                            <div class="grid">
                                <a href="#" class="bg-violet-50 text-violet-600 border-violet-200 border py-0.5 px-1.5 rounded-md ml-2
                                hover:bg-violet-100">
                                    <small>
                                        {{ userById(thread.userId)?.name }}
                                    </small>
                                </a>
                                <AppDate :timestamp="thread.publishedAt" class="ml-3" />
                            </div> -->
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>