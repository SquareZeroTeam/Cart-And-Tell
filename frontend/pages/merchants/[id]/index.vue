<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    const {data:merchant} = useFetch<any>(`${API}/merchant/${id}`);
</script>
<template>
    <div>
        <Header/>
        <div v-if="merchant" class="container mx-auto shadow-md p-8  rounded-lg mt-10 max-w-[1280px]">
            <div class="flex justify-between">
                <h1 class="text-2xl font-semibold text-blue-800">{{ merchant.name }}</h1>
                <NuxtLink :to="merchant.website" class="flex gap-2">
                    <span class="material-symbols-outlined">storefront</span>
                    <p class="hidden sm:block">Visit Website</p>
                </NuxtLink>
            </div>
            <p class="font-medium my-4">South Forbes Golf City, Brgy. Inchican, Silang, Cavite <br>
                8th Floor Galleria Corporate Center EDSA Corner Ortigas Avenue, Quezon City, Philippines
            </p>
            <div class="flex">
                <div class="flex-1 basis-0 ">
                    <div class="border-b-2 py-4">
                        <p class="text-lg font-bold">No reviews yet</p>
                        <p>The Merchant has not received any reviews yet on Cart & Tell</p>
                    </div>
                    <div class="border-b-2 py-4">
                        <p class="text-lg font-medium">Average response time</p>
                        <p class="text-xl font-bold"> &lt;2h</p>
                    </div>
                    <div class="border-b-2 py-4">
                        <p class="text-lg font-bold">Categories</p>
                        <p>Real Estate</p>
                    </div>
                </div>
                <div class="flex-1 basis-0 flex justify-center">
                    <img :src="merchant.image" alt="" class="object-contain">
                </div>
            </div>
            <div class="mt-10">
                <h2 class="text-2xl font-bold mb-4">Products</h2>
                <div class="flex">
                    <NuxtLink :to="`/products/${product.id}`" class=" rounded-lg " v-for="product in merchant.products">
                        <div class="h-[300px] w-[200px] rounded-lg shadow-md">
                            <img :src="product.image" alt="" class="rounded-lg">
                            <p class="p-4 text-center font-medium">{{ product.name }}</p>
                            <p class="text-center">₱{{ product.amount }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>