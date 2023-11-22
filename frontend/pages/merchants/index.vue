<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {data:merchants} = await useFetch<any>(`${API}/merchant`);
    console.log(merchants);
</script>
<template>
    <div>
        <Header/>
        <div class="container mx-auto">
            <div class="flex h-16 justify-between items-center p-4">
                <NuxtLink class="flex-1 flex justify-center">
                    <button type="button" class="text-2xl font-bold">Products</button>
                </NuxtLink>
                <NuxtLink class="flex-1 flex justify-center">
                    <button type="button" class="text-2xl font-bold underline">Merchants</button>
                </NuxtLink>
            </div>
        </div>
        <div class="container mx-auto shadow-md p-4 h-[calc(100svh-64px-74px)] rounded-lg">
            <div v-for="merchant in merchants" class="w-full">
                <div class="h-24 flex w-full">
                    <NuxtLink :to="`/merchants/${merchant.id}`">
                        <img class="w-24 h-24 object-contain" :src="merchant.image" alt="" >
                    </NuxtLink>
                    <div class="p-2 flex justify-between items-start w-full">
                        <NuxtLink :to="merchant.website">
                            <h2 class="text-xl font-bold underline">{{ merchant.name }}</h2>
                        </NuxtLink>
                        <NuxtLink :to="`/merchants/${merchant.id}`">
                            <button class="border-2 px-4 py-2 rounded-full border-blue-800 bg-blue-800 text-white text-lg font-bold hidden sm:block">View Profile</button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="rounded-md block sm:flex justify-between">
                    <p class="w-96 px-4 mb-4">We build in settings that favor the future. Learn how we defy modern luxury, comfort, and convenience to originate lifestyle options for the coming generations.</p>
                    <div class="flex flex-none">
                        <div class="h-36 " v-for="product in merchant.products">
                            <NuxtLink :to="`/products/${product.id}`">
                                <img class="h-full rounded-md" :src="product.image" alt="">
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>