<script setup lang="ts">

    import { useFileDialog } from '@vueuse/core';

    const API = useRuntimeConfig().public.API;
    const APILINK = `${API}/merchant/5`;
    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE';

        
    const { data: merchant } = useFetch(APILINK, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${ADMINTOKEN}`,
        },
    });

    console.log(merchant.value);

    const { files, open, reset, onChange } = useFileDialog({
        accept: 'image/*', // Set to accept only image files
    });

    onChange((files) => {
        /** do something with files */
    });

    const submitForm = async () => {
        const formData = new FormData();
        // formData.append('name', merchant.value.name);
        // formData.append('description', merchant.value.description);
        // formData.append('website', merchant.value.website);

        // try {
        //     await $fetch(APILINK, {
        //         method: 'PATCH',
        //         headers: {
        //             Authorization: `Bearer ${ADMINTOKEN}`,
        //         },
        //         body: formData,
        //     });

        //     console.log('Merchant data updated successfully!');
        // } catch (error) {
        //     console.error('Error updating merchant data:', error.data);
        // }
        console.log(merchant.value);
    };
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
                <SideBar />
            </div>

            <div class="w-full bg-white lg:mr-12">
                <div class="flex flex-col gap-4">  
                    <div class="bg-[#282F7A] flex  items-center">
                        <div class="m-6 flex">
                            <div class="text-white">
                                <button type="button" @click="open()">
                                    Choose files
                                </button>
                                <!-- <button type="button" :disabled="!files" @click="reset()">
                                    Reset
                                </button> -->
                                <template v-if="files">
                                    <p>You have selected: <b>{{ `${files.length} ${files.length === 1 ? 'file' : 'files'}` }}</b></p>
                                    <li v-for="file of files" :key="file.name">
                                        {{ file.name }}
                                    </li>
                                </template>
                            </div>
                            <div>
                                <input
                                    class="text-black ml-6 text-3xl font-bold mt-2 "
                                    placeholder="Merchant Name"
                                    v-model="merchant.name"
                                />

                                <NuxtLink :to="merchant.website" class="flex gap-2 text-white mt-4 ml-6">
                                    <span class="material-symbols-outlined">storefront</span>
                                    <p class="hidden sm:block">Visit Website</p>
                                </NuxtLink>
                            </div>
                        </div>

                    </div>
                    <div class="bg-[#282F7A]">
                        <div class="flex justify-center flex-col">
                            <textarea
                                class="text-black ml-6 text-3xl font-semibold mt-2 rounded-md placeholder-gray-400 placeholder-opacity-80 m-4 mt-6 h-[10rem] resize-vertical overflow-hidden overflow-y-auto"
                                placeholder="Insert About Company Here"
                                v-model="merchant.description"
                            ></textarea>
                            <input
                                class="text-black ml-6 text-3xl font-bold mt-2 placeholder-gray-400 placeholder-opacity-80"
                                placeholder="Insert Media Link Here"
                                v-model="merchant.website"
                            />
                        </div>
                    </div>
                    <div class="bg-[#282F7A] flex flex-col justify-center">
                        <p class="text-white mt-2  text-2xl text-center">Products</p>

                    </div>
                    <div class="bg-[#282F7A]">
                        <div class="flex justify-center">
                            <p class="text-white m-2 text-2xl">Cart & Tell Market Place</p>
                        </div>
                        <div class="flex gap-4 m-6 justify-center items-center">
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                        </div>
                    </div>
                    <button @click="submitForm" class="p-2 bg-[#6DB7FB] text-white rounded-sm text-4xl font-bold">Register Now</button>
                </div>
            </div>

        </div>
    </div>
</template>