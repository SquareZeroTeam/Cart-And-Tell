<script setup>
</script>

<template>
  <div class="container">
    <Header />
    <div class="container mx-auto flex flex-col sm:flex-row mt-2">
      <div class="hidden sm:hidden lg:flex">
        <SideBar />
      </div>
      <div class="flex flex-col gap-4 w-full lg:mr-20 bg-[#282F7A] text-center py-8 px-4 lg:px-12">
        <div>
          <p class="text-white text-4xl font-bold">Register as</p>
        </div>
        <div class="flex gap-8 justify-center items-center text-5xl font-bold m-4">
            <NuxtLink to="/mregistration">
                <button class="w-full h-full sm:h-[10rem] sm:w-[30rem] bg-[#6DB7FB] text-white rounded-md py-4">Merchant</button>
            </NuxtLink>
            <NuxtLink to="/bregistration">  
                <button class="w-full h-full sm:h-[10rem] sm:w-[30rem] bg-[#6DB7FB] text-white rounded-md py-4">Buyer</button>
            </NuxtLink> 
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
