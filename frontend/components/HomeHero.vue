<script setup>
    const {data:products} = await useFetch('https://fakestoreapi.com/products');
</script>
<template>
    <div class="container mx-auto mt-20 justify-center items-center">
        <div class="flex h-full flex-wrap">
            <div class="blend w-[512px] p-4 flex-grow">
                <h1 class="text-blue-800 font-bold text-2xl">Cart & Tell</h1>
                <h2 class="xblend text-6xl sm:text-7xl font-bold line leading-[85px] mt-4">B2B <br/> Ecommerce</h2>
                <p class="mt-4 text-gray-800 text-xl">Shop various sources from Services to Manufacturers</p>
                <NuxtLink to="/products">
                    <button class="px-6 py-4 bg-blue-800 rounded-lg text-white font-bold text-lg mt-8">Start Shopping</button>
                </NuxtLink>
                <div class="flex mt-5 gap-8 justify-center">
                    <div class="text-center">
                        <p class="text-5xl font-bold my-4">100k</p>
                        <p class="text-lg font-semibold">Happy Customers</p>
                    </div>
                    <div class="text-center">
                        <p class="text-5xl font-bold my-4">1.6M</p>
                        <p class="text-lg font-semibold">Monthly Traffic</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center relative z-[-10] w-[512px] flex-grow">
                <div class="bg-blue-600 absolute h-72 w-[400px] rounded-2xl bottom-0">
                    <div class="w-[400px] bg-blue-600 h-[400px] rounded-full absolute top-[-180px]"></div>
                </div>
                <div class="z-10 h-full relative">
                    <img class="absolute bottom-0 h-[550px] opacity-0 transition-opacity" src="/heroModel2.png" alt="">
                    <img class="opacity-100 transition-opacity" src="/heroModel.png" alt="">
                </div>
            </div>
            <div class="w-full sm:w-[512px] flex flex-col flex-grow">
                <div class="flex-1 flex flex-col justify-center items-center shadow-md 2xl:w-52 h-48 rounded-2xl m-4">
                    <p class="text-7xl font-bold text-blue-600">14K +</p>
                    <div class="mt-4 font-medium text-center 2xl:text-left">
                        <p>WorldWide Product</p>
                        <p>Sale Per Year</p>
                    </div>
                </div>
                <div class="p-4 mt-4 self-center">
                    <p class="text-5xl p-4 2xl:text-left text-center">Special Offer</p>
                    <p class="leading-[80px] text-7xl font-bold mt-6 text-center">Fashion Sale </p>
                    <NuxtLink to="/products">
                        <button class="flex justify-center items-center px-6 py-4 shadow-md rounded-full gap-2 text-blue-500 2xl:w-56 w-full">
                            <span class="material-symbols-outlined border-2 rounded-full flex justify-center items-center text-2xl h-10 w-10 border-blue-500">shopping_bag</span>
                            <p class="text-lg">Best Offer</p>
                            <span class="material-symbols-outlined">east</span> 
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
  .z-10:hover .opacity-0 {
    opacity: 1;
  }

  .z-10:hover .opacity-100 {
    opacity: 0;
  }
</style>