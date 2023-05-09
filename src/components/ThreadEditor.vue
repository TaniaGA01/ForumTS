<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import router from "@/router";
import { UseThreadsStore } from '@/stores/Threads.store';
import { UsePostsStore } from '@/stores/Posts.store'
import { UseForumStore } from '@/stores/Forums.store'
import { findBySameId } from "@/helpers";

const emit = defineEmits([
    'content', 'text',
    'newThreadData', 'data'
])

const route = useRoute()

const threadsStore = UseThreadsStore()
const thread = computed(() => findBySameId(threadsStore.threads, route.params.id))

const postStore = UsePostsStore()
const post = computed(() => postStore.posts.find(post => post.threadId === thread.value?.id))

const forumStore = UseForumStore().forums
const forumCreate = computed(() => findBySameId(forumStore, route.params.id));

const inputsValues = {
    title: ref(thread.value?.title),
    content: ref(post.value?.text),
    newId: ref(''),
    saveBtn: ref(''),
    h1: ref('')
}

const modeValue = () => {
   if(thread.value?.id){
    inputsValues.newId.value = thread.value?.id
    inputsValues.saveBtn.value = 'Edit'
   }else{
    inputsValues.newId.value = 'ggg' + Math.random()
    inputsValues.saveBtn.value = 'Publish'
   }
}

const save = ():void => {

    const newThreat: object = reactive({
        id: inputsValues.newId.value,
        forumId: route.params.id as string,
        title:  ref(inputsValues.title.value)
    })
    emit("content", ref(inputsValues.content.value))
    emit("newThreadData", newThreat)

    inputsValues.title.value = ''
    inputsValues.content.value = ''

    router.push({ name : "threadShow", params:{ id: inputsValues.newId.value } })
}

const cancel = () => {
    if(thread.value?.id){
      router.push({ name : "threadShow" })
    }else{
      router.push({ name : "Forum", params:{ id: route.params.id } })
    }
}

</script>
<template>
    <div>
        <h1 v-if="thread?.id" class="text-2xl sm:text-3xl mt-12 font-bold text-slate-600">
            Editing <span class="text-3xl sm:text-5xl">{{ thread.title }}</span>
        </h1>
        <h1 v-else class="text-2xl sm:text-3xl mt-12 font-bold text-slate-600">
            Create new thread in <span class="text-3xl sm:text-5xl">{{ forumCreate?.name }}</span>
        </h1>
        <hr class="mt-2 mb-12">
    </div>
    <Form @submit.prevent="save" :modeValue="modeValue()">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                  <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Add thread title" v-model.lazy="inputsValues.title.value" required/>
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
              <div class="mt-2">
                <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" placeholder="Add thread content" v-model.lazy="inputsValues.content.value"/>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button @click.prevent="cancel" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">{{ inputsValues.saveBtn.value }}</button>
        </div>
      </div>
    </Form>
  </template>
  
 