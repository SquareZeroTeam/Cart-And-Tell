<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {data:merchants} = await useFetch<any>(`${API}/merchant`);
    console.log(merchants);
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
                <SideBar />
            </div>
            <div class="container mx-auto mr-0 sm:mr-12">
                <div class="bg-[#282F7A] mb-4">
                    <p class="text-white text-4xl font-semibold p-4">Category</p>

                </div>
                <div class="gap-4">
                    <div v-for="merchant in merchants" class="w-full gap-4 bg-[#282F7A]">
                        
                        <div class="h-24 flex w-full ">
                            
                            <NuxtLink :to="`/merchants/${merchant.id}`">
                                <img class="w-24 h-24 object-contain m-[1rem]" :src="merchant.image" alt="" >
                            </NuxtLink>
                            <div class="flex justify-between items-center w-full">
                                <NuxtLink :to="`/merchants/${merchant.id}`">
                                    <h2 class="text-2xl font-bold underline m-[1rem] mt-[2.5rem] text-white hover:text-[#6DB7FB]">{{ merchant.name }}</h2>
                                </NuxtLink>
                                
                            </div>
                        </div>

                        <div class="rounded-md block sm:flex justify-between mb-4">
                            <p class="w-[50rem] px-4 text-justify text-white mt-12">We build in settings that favor the future. Learn how we defy modern luxury, comfort, and convenience to originate lifestyle options for the coming generations.</p>
                            <div class="flex flex-none mr-8 mb-8 justify-center items-center">
                                <div class="h-[10rem]" v-for="(product, index) in merchant.products">
                                    <NuxtLink :to="`/products/${product.id}`">
                                        <img v-if="index === 0" class="h-full rounded-md" :src="product.image" alt="">
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>