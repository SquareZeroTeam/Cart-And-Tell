<script setup lang="ts">

    const userObj = useUserObj().value;
    const API = useRuntimeConfig().public.API;
    const {data:merchant} = await useFetch<any>(`${API}/merchant/${userObj.merchant!.id}`);
    //console.log(merchant);
    //console.log(userObj);
    async function logout() {
        userObj.email= "";
        userObj.id = NaN;   
        userObj.cartCount = 0;
        userObj.loggedIn = false;
        userObj.isMerchant= false;
        userObj.merchant = null;
        const token = useCookie('token');
        token.value = null;
        setTimeout(async () => await navigateTo("/login"),2000);
    }    

</script>

<template>
    
    <div class=" bg-white">
        <div class="flex flex-col items-center mt-8 gap-4 mr-4 ml-12">
            <NuxtLink to="/">
                <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                <p>Home</p>
            </button>
            </NuxtLink>     
            <div v-if="!userObj.loggedIn">
                <NuxtLink to="/login">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Log in</p>
                    </button>
                </NuxtLink>
            </div>
            <div v-if="userObj.loggedIn && userObj.isMerchant && !userObj.merchant && !merchant.isVerified">
                <NuxtLink to="/registration">
                    <button class="w-44 h-[4rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Create Merchant Profile</p>
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
            
            <div v-if="userObj.loggedIn && userObj.merchant && merchant.isVerified"><!-- and registered -->
                <NuxtLink :to="`/profile/${userObj.merchant.id}`">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Merchant Profile</p>
                    </button>
                </NuxtLink>
            </div>
            <button v-if="userObj.loggedIn" @click="logout" class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                <p>Log out</p>
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>