<script setup>
    import { ref } from 'vue'; // Import the ref function from the Vue Composition API
    const API = useRuntimeConfig().public.API;
    const { data: categories } = useFetch(`${API}/category`, { lazy: true });
    const slides = ref(Array.from({ length: 4 }, (_, index) => index + 1));


    const images = Array.from({ length: 24 }, (_, index) => `category${index + 1}.jpg`);

</script>

<template>
    <div class="w-full bg-white lg:mr-12">
        <div class="flex flex-col gap-4">  
            <div class="bg-[#282F7A] flex">
                <p class="text-white ml-6 text-xl absolute mt-2 hidden sm:block">Introduction</p>
                <div class="mx-auto">
                    <img class="w-96 h-auto" src="/intro.jpg" alt="Introduction Image">
                </div>
            </div>
            <div class="bg-[#282F7A]">
                <div class="flex justify-center">
                    <p class="text-white m-2 text-2xl">{{(categories)? Object.keys(categories).length: ""}} Categories</p>
                </div>
                <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-40">
                    <div class="gap-4 flex flex-wrap justify-center ">
                        <!-- <NuxtLink v-for="(item, index) in items" :key="index" to="/merchants">
                            <button class="flex flex-col items-center max-w-[80px] ">
                                <div class="w-20 h-16 bg-white mb-2"></div>
                                <p class="text-white text-center ">{{ item.text }}</p>
                            </button>
                        </NuxtLink> -->
                         <NuxtLink v-for="(category, index) in categories" :key="category.id" to="/merchants" > <!--:to="`/merchant/${category.name}`" -->
                            <button class="flex flex-col items-center max-w-[80px] ">
                                <!-- <div class="w-20 h-16 bg-white mb-2"></div> -->
                                <img class="bg-white h-20 w-20" :src="`/Categories/category${index+1}.jpg`" alt="">
                                <p class="text-white text-center ">{{ category.name }}</p> 
                            </button>
                        </NuxtLink>
                    </div>
                </div>  
            </div>
            <div class="bg-[#282F7A] flex flex-col justify-center">
                <p class="text-white mt-2  text-2xl text-center">Partner Merchants</p>
                <div class="m-4">
                    <SlidePartnerMerchant/>
                </div>      
            </div>
            <div class="bg-[#282F7A]">
                <div class="flex justify-center">
                    <p class="text-white m-2 text-2xl">Cart & Tell Market Place</p>
                </div>
                <div class="flex gap-4 m-6 justify-center items-center">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div v-for="index in slides" :key="index" class="">
                            <img class="h-32 w-64 object-contain" :src="`/Item/item${index}.png`" alt="">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Rest of the style code */
</style>