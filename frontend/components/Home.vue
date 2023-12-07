<script setup>
const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books & Literature',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Health & Wellness',
  'Jewelry',
  'Food & Grocery',
  'Music & Instruments',
  'Pets',
  'Art & Collectibles',
  'Office & School Supplies',
  'Travel & Luggage',
];

const items = ref(categories.map((category, index) => ({
  link: `/category/${index + 1}`,
  text: category,
})));
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
                    <p class="text-white m-2 text-2xl">16 Categories</p>
                </div>
                <div class="mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-40">
                    <div class="gap-4 flex flex-wrap justify-center ">
                        <NuxtLink v-for="(item, index) in items" :key="index" to="/merchants"><!-- test muna -->
                            <button class="flex flex-col items-center max-w-[80px] ">
                                <div class="w-20 h-16 bg-white mb-2"></div>
                                <p class="text-white text-center ">{{ item.text }}</p>
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
                    <div class="bg-white h-32 w-64"></div>
                    <div class="bg-white h-32 w-64"></div>
                    <div class="bg-white h-32 w-64"></div>
                    <div class="bg-white h-32 w-64"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>