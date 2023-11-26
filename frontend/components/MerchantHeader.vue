<script setup lang="ts">
    const userObj = useUserObj().value;
</script>
<template>
    <header class="shadow-sm border-b-[1px] bg-white ">
        <div class=" text-white text-md ">
                <div class="text-[#2563EB] mt-2 mb-2 items-center flex justify-end px-6">
                    <NuxtLink to="/">
                        <button class="mr-2">
                            <span class="material-symbols-outlined text-5xl font-extrabold">arrow_back</span>   
                        </button>
                    </NuxtLink>   
                    <NuxtLink to="/merchant/merchantcenter" class="flex">
                        <h1 class="flex-none font-bold text-3xl mr-2 mt-auto">Cart & Tell</h1> 
                        <p class="text-black font-semibold text-xl mt-auto">Merchant Center</p>
                    </NuxtLink>
                    
                    <div class="flex items-center ml-auto gap-6">
                        <div class="flex items-center">
                            <span class="material-symbols-outlined text-5xl">account_circle</span>
                            <p class="text-lg font-medium text-black">{{ userObj.username }}</p>   
                        </div> 
                        <div class="w-[2px] h-12 bg-gray-300"></div>
                        <div>
                            <span class="material-symbols-outlined text-4xl">notifications_unread</span>
                        </div>            
                    </div>   
                </div>
        </div>
    </header>
</template>