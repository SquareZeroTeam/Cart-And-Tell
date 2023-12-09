<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    const {data:merchant} = useFetch<any>(`${API}/merchant/${id}`);
    console.log(merchant.value)
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
                    <div class="bg-[#282F7A] flex  items-center">
                        <div class="m-6 flex">
                        
                        </div>
                        
                    </div>
                    <div class="bg-[#282F7A]">
                        <div class="flex justify-center flex-col">
                            <p class="text-white m-2 text-2xl">[Insert About Company Here]</p>
                            <p class="text-white m-2 text-2xl">[Insert Social Media Links Here]</p>
                        </div>
                    </div>
                    <div class="bg-[#282F7A] flex flex-col justify-center">
                        <p class="text-white mt-2  text-2xl text-center">Products</p>
                       
                    </div>
                    <div class="bg-[#282F7A]">
                        <div class="flex justify-center">
                            <p class="text-white m-2 text-2xl">Cart & Tell Market Place</p>
                        </div>
                        <div class="flex gap-4 m-6 justify-center items-center">
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                            <div class="bg-white h-32 w-64"></div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>