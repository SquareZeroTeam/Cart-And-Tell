<script setup lang="ts">
    import { ref } from 'vue';
    
    let isModalVisible = ref(false);
    const API = useRuntimeConfig().public.API;
    const userObj = useUserObj().value;
    // console.log(userObj.merchant!.id)


    const {data:merchant} = await useFetch<any>(`${API}/merchant/${userObj.merchant?.id}`);
    console.log(userObj);
    console.log(merchant.value);

    function modalToggle() {
        isModalVisible.value = !isModalVisible.value;
    }

    async function notify() {
        
        let isError = false;
        const token = useCookie('token');
        const formData = new FormData();
        formData.append('isNotified', 'false');
        
        const data = await $fetch<{message:string}>(`${API}/merchant/${userObj.merchant.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formData
        }).catch(error => {
            alert(error.data.message);
            isError = true
            return;
        });
        if (!isError) {
            alert("You are now a verified Merchant");
        }
        console.log(merchant.value);
    }
</script>

<template>
    <header class="shadow-sm pb-4 w-full bg-[#282F7A] m-0 p-0">
        <div class="flex justify-center items-center pt-4">
            <div v-if="merchant" class="left-0 absolute">
                <div class="flex items-center ml-16">
                    <NuxtLink :to="`/profile/${merchant.id}`">
                        <img class="w-14 h-14 rounded-full border-2" :src="merchant.image" alt="Introduction Image">
                    </NuxtLink>
                    <NuxtLink :to="`/profile/${merchant.id}`">
                        <div class="text-white font-semibold text-xl ml-2">{{ merchant.name }}</div>
                    </NuxtLink>
                    <button v-if="!merchant.isNotified">
                        <span class="material-symbols-outlined text-white text-4xl ml-3">notifications</span>
                    </button>
                    <button @click="notify" v-if="merchant.isNotified">
                        <span class="material-symbols-outlined text-white text-4xl ml-3">notifications_active</span>
                    </button>
                </div>
            </div>
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
 
            
            <div v-if="!userObj.loggedIn">
                <NuxtLink to="/user/cart">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Log in</p>
                    </button>
                </NuxtLink>
            </div>
            

            <div v-if="userObj.loggedIn">
                <NuxtLink to="/registration">
                    <button class="w-44 h-[4rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Register as Merchant</p>
                    </button>
                </NuxtLink>
            </div>

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

            <div v-if="userObj.loggedIn">
                <NuxtLink to="/user/cart">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Your Cart</p>
                    </button>
                </NuxtLink>
            </div>
            
            <div v-if="userObj.loggedIn"><!-- and registered -->
                <NuxtLink to="/profile">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Merchant Profile</p>
                    </button>
                </NuxtLink>
            </div>
                    </div>
            </div>
        </div>
    </header>
</template>