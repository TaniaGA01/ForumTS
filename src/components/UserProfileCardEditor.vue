<script setup lang="ts">
import type { UserI, UserAthI } from '@/data/data.interfaces'
import { UseUserAuthStore } from '@/stores/UserAuth.store'
import { ref } from 'vue';
import router from "@/router";

const usersStore = ref(UseUserAuthStore())
const props = defineProps<{
    user: UserAthI,
}>()
const activeUser = ref({ ...props.user } as UserI) // this is for not modifie in reactive way v-model inputs and store data

const save = (activeUserUpdatedData:UserI): void  => { 
    const userUpdate = {
        ...activeUserUpdatedData
    }
    usersStore.value.editUser(userUpdate)
    router.push({ name : "userProfile" })
}

const cancel = () =>{
    router.push({ name : "userProfile" })
}
</script>
<template>
    <div class="bg-white p-6 shadow">
        <form @submit.prevent="save(activeUser)" class="grid place-content-center">
            <div class="col-span-full">
                <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
                <div class="mt-2 text-center">
                    <div>
                        <div class="h-48 w-48 rounded-full inline-flex overflow-scroll justify-center items-center mb-5">
                        <img class="" aria-hidden="true"
                            :src="activeUser.avatar"
                            :alt="`${activeUser.name} profil picture`" />
                        </div>
                    </div>
                    <a type="button" 
                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</a>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                    <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" v-model="activeUser.username" />
                </div>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <label for="fullname" class="block text-sm font-medium leading-6 text-gray-900">Fullname</label>
                <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                    <input type="text" name="fullname" id="fullname" autocomplete="fullname" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" v-model="activeUser.name" />
                </div>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Bio</label>
                <div class="mt-2">
                <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6" v-model="activeUser.bio"/>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            <div class="flex place-content-between mt-9 mb-5">
                <span class="text-slate-800 ml-2">{{ props.user.UserPosts.length }} posts</span>
                <span class="text-slate-800 ml-2">{{ props.user.UserThreads.length }} threads</span>
            </div>
            <hr>
            <div class="col-span-full mt-4">
                <label for="website" class="block text-sm font-medium leading-6 text-gray-900">Website</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                        <input type="text" name="website" id="website" autocomplete="website" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="website" v-model="activeUser.website"/>
                    </div>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                        <input type="text" name="email" id="email" autocomplete="email" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Email" v-model="activeUser.email"/>
                    </div>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-fuchsia-600 sm:max-w-md">
                        <input type="text" name="location" id="location" autocomplete="location" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Location" v-model="activeUser.twitter"/>
                    </div>
                </div>
            </div>
            <div class="col-span-full mt-4">
                <div class="flex justify-between">
                    <button
                        @click="cancel"
                        class="block bg-slate-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-slate-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 mt-5">Cancel
                    </button>
                    <button
                        class="block bg-violet-500 rounded-lg px-3.5 py-2.5 text-center text-md font-semibold text-white shadow-sm hover:bg-violet-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mt-5">Save
                    </button>
                </div>
            </div>
        </form>   
    </div>
    <div class="text-center mt-5">
        <small>Member since june 2003 <br/>last visited 4 hours ago</small>
    </div>
</template>