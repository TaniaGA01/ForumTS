<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const emit = defineEmits(["newPostData", "data"])

let newPostText = ref('')

const save = (): void => {
    const newPost: object = reactive({
        text: newPostText,
        threadId: route.params.id as string,
    })
    emit("newPostData", newPost)
    newPostText.value = ""
}

</script>
<template>
    <div class="bg-slate-200 mt-3 shadow-md">
        <form @submit.prevent="save" method="POST" class="mx-auto mt-16 max-w-2xl sm:mt-5 py-20">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label for="message" class="block text-md font-semibold leading-6 text-slate-800">Your
                        comment</label>
                    <div class="mt-2.5">
                        <textarea v-model="newPostText" name="message" id="message" rows="4"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <button
                    class="block w-full bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Add
                    your comment
                </button>
            </div>
        </form>
    </div>
</template>