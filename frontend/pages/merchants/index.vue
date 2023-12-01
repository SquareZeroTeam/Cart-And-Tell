<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {data:merchants} = await useFetch<any>(`${API}/merchant`,{
        transform: (data) => {
            return data.map( (merchant:any)  => {
                merchant.products = merchant.products.splice(0,3);
                return merchant;
            })
        }
    });
    console.log(merchants.value)
</script>
<template>
    <div class="bg-gray-100 min-h-screen">
        <Header/>
        <div class="container mx-auto mt-8 px-4 sm:px-6 lg:px-8"> 
            <div class="container mx-auto ">
                <div class="flex h-16 justify-between items-center p-4">
                    <NuxtLink to="/products" class="flex-1 flex justify-center">
                        <button type="button" class="text-3xl font-bold text-[#2563EB]">Products</button>
                    </NuxtLink>
                    <NuxtLink class="flex-1 flex justify-center">
                        <button type="button" class="text-3xl font-bold underline text-[#2563EB]">Merchants</button>
                    </NuxtLink>
                </div>
            </div>
            <div class="container mx-auto shadow-md p-4 h-[calc(100svh-64px-74px)] rounded-lg bg-white">
                <div v-for="merchant in merchants" class="w-full">
                    <div class="h-24 flex w-full m-4">
                        <NuxtLink :to="`/merchants/${merchant.id}`">
                            <img class="w-24 h-24 object-contain m-[1rem]" :src="merchant.image" alt="" >
                        </NuxtLink>
                        <div class="p-2 flex justify-between items-center w-full">
                            <NuxtLink :to="merchant.website">
                                <h2 class="text-2xl font-extrabold underline m-[1rem] mt-[2.5rem] text-blue-800">{{ merchant.name }}</h2>
                            </NuxtLink>
                            <NuxtLink :to="`/merchants/${merchant.id}`">
                                <button class="m-8 border-2 px-4 py-2 rounded-full border-blue-800 bg-blue-800 text-white text-lg font-bold hidden sm:block">View Profile</button>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="rounded-md block sm:flex justify-between">
                        <p class="w-96 px-4 m-[1rem] text-justify">We build in settings that favor the future. Learn how we defy modern luxury, comfort, and convenience to originate lifestyle options for the coming generations.</p>
                        <div class="flex flex-none flex-wrap">
                            <div class="h-full " v-for="product in merchant.products">
                                <NuxtLink :to="`/products/${product.id}`">
                                    <img class="h-[160px] object-contain rounded-md" :src="product.image" alt="">
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="border-b border-gray-300 my-4"></div>
                </div>
            </div>
        </div>
    <Footer/>
    </div>
</template>