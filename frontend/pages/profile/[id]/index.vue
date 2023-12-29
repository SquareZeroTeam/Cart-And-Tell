<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const userObj = useUserObj().value;
    const {id} = useRoute().params;
    if (!userObj.loggedIn || !userObj.isMerchant || !userObj.merchant) {
        await navigateTo('/login');
    }
    if (!userObj.merchant) {
        await navigateTo('/registration');
    }
    const {data:merchant,error} = await useFetch<any>(`${API}/merchant/${userObj.merchant!.id}`,{key:userObj.merchant!.id.toString()});
    if (error.value?.statusCode == 404) {
        throw createError({statusCode:404,statusMessage:"Merchant Not Found"});
    }
    if (userObj!.merchant!.id !== parseInt(id as string)) {
        throw createError({statusCode:403,statusMessage:"Forbidden Access"});
    }
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
                <SideBar />
            </div>
            <div class="w-full bg-white lg:mr-12">
                <div class="flex flex-col gap-4">  
                    <div class="bg-[#282F7A] flex  items-center flex-1 w-full">
                        <div class="m-6 flex w-full">
                            <img class="w-48 h-auto rounded-md" :src="merchant.image" alt="Introduction Image">
                            <div class="flex justify-between items-start flex-1">
                                <div>
                                    <p class="text-white ml-6 text-3xl font-bold  mt-2">{{merchant.name}}</p>
                                    <div class="ml-6" v-if="merchant.isVerified">
                                        <h2 class="font-bold text-white">Verified</h2>
                                    </div>
                                    <div class="ml-6" v-else>
                                        <h2 class="font-bold text-white">Not Verified/Pending</h2>
                                    </div>
                                </div>
                                <NuxtLink v-if="merchant.isVerified" :to="`${id}/edit`">
                                    <button class="font-bold text-blue-600 rounded-full px-4 py-2 border-transparent border-2 bg-white">Edit Profile</button>
                                </NuxtLink>
                            </div> 
                        </div>                
                    </div>
                    
                    <div class="bg-[#282F7A]">
                        <div class="flex flex-col gap-4">
                            <!-- fixed hydration mismatch -->
                            <p class="text-white m-6 text-2xl"><span class="text-[#6DB7FB]">Description:</span> <br>{{merchant.description.trim()}}</p> 
                            <NuxtLink :to="merchant.website">
                                <p class="text-white m-6 text-2xl"><span class="text-[#6DB7FB]">Link:</span><br>{{merchant.website }}</p>
                            </NuxtLink>
                        </div>  
                    </div>
                    <div class="bg-[#282F7A] flex flex-col justify-center">
                        <div class="flex justify-between items-center p-4">
                            <p class="text-white mt-2  text-2xl text-center font-bold">Products</p>
                            <NuxtLink v-if="merchant.isVerified" :to="`${id}/products/create`">
                                <button class="font-bold text-blue-600 rounded-full px-4 py-2 border-transparent border-2 bg-white">Add Product</button>
                            </NuxtLink>
                        </div>
                        <SlideProductMerchant :products="merchant.products"/>
                    </div>
                    <!-- <div class="bg-[#282F7A]">
                        <div class="flex justify-center">
                            <p class="text-white m-2 text-2xl">Cart & Tell Market Place</p>
                        </div>
                        <div class="flex gap-4 m-6 justify-center items-center">
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                        </div>
                    </div> -->
                </div>
            </div>
            
        </div>
    </div>
</template>