<script setup>
    const {data:categories} = await useFetch('https://fakestoreapi.com/products/categories');  
</script>
<template>
    <div class="container mx-auto px-4 my-12">
        <h2 class="my-4 text-3xl font-bold">Categories</h2>
        <div class="flex justify-start items-center  gap-4 overflow-x-scroll no-scrollbar">

            <NuxtLink to="/merchants">
                <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                    <div class="text-center">
                        <span class="text-5xl material-symbols-outlined">real_estate_agent</span>
                        <p class="text-xl font-bold text-center">Real Estate</p>
                    </div>
                </div>
            </NuxtLink>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">restaurant</span>
                    <p class="text-xl font-bold text-center">Food & Beverages</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">tools_phillips</span>
                    <p class="text-xl font-bold text-center">Skin Care & Cosmetic</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">precision_manufacturing</span>
                    <p class="text-xl font-bold text-center">Industrial Products</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">location_city</span>
                    <p class="text-xl font-bold text-center">Home Services</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">savings</span>
                    <p class="text-xl font-bold text-center">Insurance & Investment</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">calculate</span>
                    <p class="text-xl font-bold text-center">Accounting & Bookkeeping</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined">calculate</span>
                    <p class="text-xl font-bold text-center">Insurance & Investment</p>
                </div>
            </div>
            <div class="flex-none flex justify-evenly items-center border-2 rounded-full p-4 w-48 h-48 hover:border-blue-800" v-for="i in categories" :key="i">
                <div class="text-center">
                    <span class="text-5xl material-symbols-outlined" v-if="i == 'electronics'">memory</span>
                    <span class="text-5xl material-symbols-outlined" v-if="i == 'jewelery'">diamond</span>
                    <span class="text-5xl material-symbols-outlined" v-if="i === 'men\'s clothing'">male</span>
                    <span class="text-5xl material-symbols-outlined" v-if="i === 'women\'s clothing'">female</span>
                    <p class="text-xl font-bold text-center">{{ i.charAt(0).toUpperCase() + i.slice(1) }}</p>
                </div>
            </div>
        </div> 
    </div>
</template>
<style scoped>
    .no-scrollbar::-webkit-scrollbar {
          display: none;
      }
      .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
      }
</style>