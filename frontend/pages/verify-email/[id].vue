<script setup lang="ts" >
    const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    const {data,error} = useFetch(`${API}/verify-email/${id}`)
    if (error.value) {
        throw createError({
            statusCode: 400,
            message: error.value.data.message})
    }
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
            <SideBar />
            </div>
            <div class="flex flex-col gap-4 w-full mr-20 justify-center items-center"> 
                <img class="w-[250px]" src="/emailLogo.png" alt="">
                <h1 class="font-bold text-3xl">Email Verified</h1>
                <p class="text-gray-600 text-lg font-medium">You have successfully verified your account</p>
                <NuxtLink to="/login">
                    <button class="px-12 py-4 bg-[#282F7A] text-white rounded-full font-bold text-2xl">Login</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>