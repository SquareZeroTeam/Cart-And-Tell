<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    import { io } from 'socket.io-client';
    const {data:liveStreams} = await useFetch<[{roomId:string,merchantId:number,merchant:{name:string,image:string}}]>(`${API}/livestreams`);
    console.log(liveStreams.value);
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
            <SideBar />
            </div>
            <div class="flex flex-col gap-4 w-full">  
                <div class="bg-[#282F7A]">
                    <p class="text-white m-4 font-bold">Live Streams: {{ liveStreams?.length }}</p>
                </div>
                <div class="">
                    <div class="flex flex-wrap gap-4">
                        <NuxtLink :to="`/livestreams/${liveStream.roomId}`" v-for="liveStream in liveStreams">
                            <div class="w-[350px] rounded-md shadow-md overflow-hidden">
                                <img :src="liveStream.merchant.image" alt="">
                                <div class="bg-[#282F7A] text-white font-bold p-4 flex justify-between items-center">
                                    <p>{{liveStream.merchant.name}}</p>
                                    <!-- <p>Viewers: 2</p> -->
                                </div>
                            </div>
                        </NuxtLink>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>