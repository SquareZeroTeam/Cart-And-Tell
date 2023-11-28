<script setup>
import { ref } from 'vue';

const isShowDropDown1 = ref(false);

const handleToggleDropDown1 = () => {
    isShowDropDown1.value = !isShowDropDown1.value;
};

const isShowDropDown2 = ref(false);

const handleToggleDropDown2 = () => {
    isShowDropDown2.value = !isShowDropDown2.value;
};

const isShowDropDown3 = ref(false);

const handleToggleDropDown3 = () => {
    isShowDropDown3.value = !isShowDropDown3.value;
};
</script>

<template>
    <div class=" bg-white h-screen shadow-2xl shadow-blue-500/20">
        <NuxtLink to="/merchant/merchantcenter" class="flex text-[#2563EB] mb-4">
            <img src="/CartTellLogo.png" class="h-16 w-16 mt-2 mr-2">
            <div class="flex flex-col justify-center pt-4">
            <h1 class="flex-none font-bold text-xl text-black pr-3">Cart & Tell <span class="flex font- text-xl text-[#2563EB]">Merchant Center</span></h1>
            </div>
        </NuxtLink>
        <ul class="text-gray-500">
            <li class="relative">
                <div class="p-3 pl-4 h-8 w-full flex items-center hover:text-[#2563EB] cursor-pointer" @click="handleToggleDropDown1">
                    <span class="material-symbols-outlined mr-2 transition duration-400 ease-in-out text-3xl">local_shipping</span>
                    <span class="font-semibold">Shipment</span>
                    <div class="absolute top-[2px] right-2 transition-transform duration-350 rotate-0" :class="{ '-rotate-180': isShowDropDown1 }">
                        <span class="material-symbols-outlined h-6 w-6">stat_1</span>
                    </div>
                </div>
                
                <ul class="overflow-hidden gap-4" :class="{ 'max-h-0': isShowDropDown1, 'max-h-full': !isShowDropDown1 }">
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">My Shipment</li>
                    </NuxtLink>
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">Mass Ship</li>
                    </NuxtLink>
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">Shipping Setting</li>
                    </NuxtLink>
                </ul>
            </li>
            <li class="relative">
                <div class="p-3 pl-4 h-8 w-full flex items-center hover:text-[#2563EB] cursor-pointer" @click="handleToggleDropDown2">
                    <span class="material-symbols-outlined mr-2 transition duration-400 ease-in-out text-3xl">list_alt</span>
                    <span class="font-semibold">Order</span>
                    <div class="absolute top-[2px] right-2 transition-transform duration-350 rotate-0" :class="{ '-rotate-180': isShowDropDown2 }">
                        <span class="material-symbols-outlined h-6 w-6">stat_1</span>
                    </div>
                </div>
                
                <ul class="overflow-hidden gap-4" :class="{ 'max-h-0': isShowDropDown2, 'max-h-full': !isShowDropDown2 }">
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">My Orders</li>
                    </NuxtLink>
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">Cancellation</li>
                    </NuxtLink>
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">Return/Refund</li>
                    </NuxtLink>
                </ul>
            </li>
            <li class="relative">
                <div class="p-3 pl-4 h-8 w-full flex items-center hover:text-[#2563EB] cursor-pointer" @click="handleToggleDropDown3">
                    <span class="material-symbols-outlined mr-2 transition duration-400 ease-in-out text-3xl">inventory_2</span>
                    <span class="font-semibold">Product</span>
                    <div class="absolute top-[2px] right-2 transition-transform duration-350 rotate-0" :class="{ '-rotate-180': isShowDropDown3 }">
                        <span class="material-symbols-outlined h-6 w-6">stat_1</span>
                    </div>
                </div>
                
                <ul class="overflow-hidden gap-4" :class="{ 'max-h-0': isShowDropDown3, 'max-h-full': !isShowDropDown3 }">
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">My Products</li>
                    </NuxtLink>
                    <NuxtLink to="">
                        <li class="hover:text-[#2563EB] hover:bg-gray-100 p-2 pl-12 transition duration-200 ease-in-out cursor-pointer">Add New Product</li>
                    </NuxtLink>
                </ul>
            </li>
            
        </ul>
    </div>
</template>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>
