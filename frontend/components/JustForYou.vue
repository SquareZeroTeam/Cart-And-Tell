<script setup>
    const {data:products} = useFetch('https://fakestoreapi.com/products');
</script>
<template>
    <div class="container mx-auto my-4">
        <h2 class="my-4 text-3xl font-bold">Just For You</h2>
        <div class="flex flex-wrap gap-4 justify-center p-4">
            <div v-for="product in products" class=" w-[180px] h-[330px] sm:w-[280px] sm:h-[400px] flex flex-col justify-between p-4 shadow-md rounded-lg">
                <div class="flex-none h-[200px] sm:h-[300px] flex justify-center items-center">
                    <img :src="product.image" alt="" class="object-contain h-full">
                </div>
                <p class="text-ellipsis overflow-hidden whitespace-pre-line h-24">{{ product.title }}</p>
                <p class="text-center font-bold py-3">₱{{ (product.price * 10).toFixed(2)}}</p>
            </div>
        </div>  
    </div>
</template>