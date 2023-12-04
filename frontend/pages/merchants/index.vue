<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {data:merchants} = await useFetch<any>(`${API}/merchant`);
    console.log(merchants);
</script>
<template>
    <div class="">
        <Header/>
        <div class="flex justify-center container mx-auto mt-2">
            <SideBar/>
            <div class="container mx-auto mr-12">
                <div class="gap-4">
                    <div v-for="merchant in merchants" class="w-full gap-4 bg-[#282F7A]">
                        <div class="h-24 flex w-full ">
                            <NuxtLink :to="`/merchants/${merchant.id}`">
                                <img class="w-24 h-24 object-contain m-[1rem]" :src="merchant.image" alt="" >
                            </NuxtLink>
                            <div class="flex justify-between items-center w-full">
                                <NuxtLink :to="merchant.website">
                                    <h2 class="text-2xl font-extrabold underline m-[1rem] mt-[2.5rem] text-[#6DB7FB]">{{ merchant.name }}</h2>
                                </NuxtLink>
                                <NuxtLink :to="`/merchants/${merchant.id}`">
                                    <button class="m-10 px-4 py-2 rounded-full bg-[#6DB7FB] text-white text-lg font-bold hidden sm:block">View Profile</button>
                                </NuxtLink>
                            </div>
                        </div>

                        <div class="rounded-md block sm:flex justify-between">
                            <p class="w-96 px-4 m-[1rem] text-justify text-white">We build in settings that favor the future. Learn how we defy modern luxury, comfort, and convenience to originate lifestyle options for the coming generations.</p>
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