<script setup>
    const formData = reactive({
        username: '',
        password: ''
    })

    watch(formData, () => {
        console.log(formData)
    });

</script>
<template>
    <div class="container mx-auto">
        <h1 class="text-[#282F7A] flex-none font-bold text-3xl mt-[1.5rem] ml-[1.5rem] absolute">Cart & Tell</h1>
        <div class="flex justify-center items-center flex-col h-[100svh]">
            <h3 class="text-2xl font-bold text-black mb-[2.5rem]">Sign in to <span class="text-[#282F7A]">Cart & Tell</span></h3>
            <div class="relative group">
                <input v-model="formData.username" type="text" id="username" required class="peer w-[28rem] h-[3rem] mb-[1.5rem] text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-[1.5rem]">
                <label for="username" class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-[1.5rem] text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Username</label>      
            </div>
            <div class="relative group">
                <input v-model="formData.password" type="password" id="password" required class="peer w-[28rem] h-[3rem] text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-[1.5rem]">
                <label for="password" class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-[1.5rem] text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password</label>
                <p class="text-sm text-[#282F7A] font-semibold cursor-pointer mb-[1.5rem] mt-[0.25rem]">Forgot Password?</p>
            </div>
            <button type="button" class="w-[28rem] h-[3rem] border-2 bg-[#282F7A] rounded-[0.5rem] text-white font-bold text-xl mt-[0.5rem]">Sign in</button>
            <p class="text-md mt-[0.25rem]">Don't have an account? <NuxtLink to="/signup" class="text-[#282F7A] font-bold cursor-pointer">Sign up</NuxtLink></p>
        </div>
    </div>
    
</template>

<style scoped>

</style>