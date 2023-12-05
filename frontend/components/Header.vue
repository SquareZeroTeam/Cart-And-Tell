<script setup lang="ts">
    let isModalVisible = ref(false);

    function modalToggle() {
        isModalVisible.value = !isModalVisible.value;
    }
</script>
<template>
    <header class="shadow-sm pb-4 w-full bg-[#282F7A] m-0 p-0">
        <div class="flex justify-center items-center pt-4">
            <div class="border-l-2 h-14 bg-gray-500 mr-1"></div>
            <NuxtLink to="/" class="text-center text-white text-lg">
                
                <p class="text-[2.20rem]">
                    <span class="font-bold">CART</span>
                    & TELL
                </p>
                <p class="text-gray-200">
                    ECOMMERCE  SOLUTIONS
                </p>
            </NuxtLink>
            <div class="block lg:hidden">
                <button @click="modalToggle" class="flex justify-center items-center bg-white rounded-md h-10 w-10 absolute right-4 top-8    ">
                    <span class="material-symbols-outlined text-3xl">menu</span>
                </button>         
            </div>
            <div v-if="isModalVisible" class="absolute right-0 top-20">

                    <div class="flex flex-col items-center gap-2 bg-white p-2  ">
                        <NuxtLink to="/">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Home</p>
                        </button>   
                        </NuxtLink>
                        
                        <NuxtLink to="/mregistration">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Registration</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/aboutus">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>About Us</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/contactus">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Contact Us</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/policy">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Policy</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/certifications">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Certifications</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/ratings">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Ratings</p>
                        </button>
                        </NuxtLink>

                        <NuxtLink to="/user/cart">
                            <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                            <p>Your Cart</p>
                        </button>
                        </NuxtLink>
                    </div>
            </div>
        </div>
    </header>
</template>