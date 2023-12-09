<script setup>

    const userObj = useUserObj().value;
    //console.log(userObj);


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
            

            <div v-if="userObj.loggedIn && !userObj.isMerchant">
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
            
            <div v-if="userObj.loggedIn && userObj.isMerchant"><!-- and registered -->
                <NuxtLink to="/profile">
                    <button class="w-44 h-[3rem] bg-[#6DB7FB] rounded-sm text-white font-bold text-xl mt-0.5">
                        <p>Merchant Profile</p>
                    </button>
                </NuxtLink>
            </div>
            
        </div>
    </div>
</template>

<style scoped>

</style>