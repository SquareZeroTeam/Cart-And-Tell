<script setup lang="ts">
    import  {io} from "socket.io-client" 
    const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    
    const messagesArray = ref<Array<{
        id:number,
        text:string,
        user:{id:number,email:string}
    }>>([]);

    const message = ref("");

    const userObj = useUserObj().value;
    const {data:livestream,error} = await useFetch<{roomId:string,merchant:{name:string,image:string,category:{name:string}}}>(`${API}/livestreams/${id}`,{
        key:id.toString()
    })
    if (error.value) {
        throw createError({statusCode:404,message:error.value.data.message});
    }
    const expand = ref<boolean>(false);
    const socket = io(`${API}/messages`,{
        extraHeaders:{
            'Authorization': `Bearer ${useCookie('token').value}`
        }
    });
    onBeforeMount(() => {
        socket.emit('findAllMessages',{roomId:id},(messages:any) => {
            messagesArray.value = messages; 
        })
        socket.emit('join',{userId:userObj.id,roomId:id},() =>{});
        socket.on('message',(message:any) => {
            console.log(message);
            messagesArray.value.push(message);
        })
    })
    onBeforeRouteLeave(() => {
        socket.disconnect();
    })

    function createMessage() {
        socket.emit('createMessage',{
            text:message.value,
            userId:userObj.id,
            liveStreamRoomId:id
        },() =>{});
        message.value = "";
    }
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden xl:flex">
            <SideBar />
            </div>
            <div class="flex flex-col gap-4 w-full">  
                <div class="bg-[#282F7A]">
                    <p class="text-white m-4 font-bold">Live Stream Session</p>
                </div>
                <div class=" h-[750px] border-2 rounded-xl flex p-4 bg-[#F2F4F7]">
                    <div class="w-full h-full flex flex-col mr-4 gap-4">
                        <div class="flex justify-start items-center bg-white rounded-lg">
                            <img :src="livestream?.merchant.image" class="h-16" alt="">
                            <div class="p-4">
                                <p class="font-bold">{{ livestream?.merchant.name}}</p>
                                <p>{{ livestream?.merchant.category.name }}</p>
                            </div>
                        </div>
                        <div class="w-full h-full border-2 rounded-xl overflow-hidden border-transparent">
                            <img src="/samplelivestream.jpg" class="h-full w-full object-cover" alt="">
                        </div>
                        <div class="h-[100px] rounded-full flex justify-center">
                            <button class="bg-red-600 text-white px-4 py-2 rounded-full h-16 w-48 font-bold border-2 border-red-600 hover:bg-white hover:text-red-600" type="button">End Session</button>
                        </div>
                    </div>
                    <div class="w-[500px] border-2 h-full rounded-xl bg-white border-transparent flex flex-col">
                        <p class="p-4 font-bold text-2xl">Chat</p>
                        <div  v-if="!expand" class="m-4 rounded-lg flex flex-col border-2 p-4">
                            <div @click="expand = true" class="flex justify-between items-center">
                                <p class="font-bold text-lg">Vans Shoes</p>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </div>
                        </div>
                        <div v-else class="m-4 rounded-lg flex flex-col border-2 p-4">
                            <div @click="expand = false" class="flex justify-end items-center">
                                <span class="material-symbols-outlined">expand_more</span>
                            </div>
                            <img src="/sample.jpg" class="h-[185px] object-contain" alt="">
                            <p class="font-bold text-lg">Vans Shoes</p>
                        </div>

                        <div class="p-4 mt-4 overflow-y-scroll h-full">
                            <div v-for="message in messagesArray">
                                <div v-if="message.user.id != userObj.id" class="flex flex-col">
                                    <p class="font-bold">{{ message.user.email }}</p>
                                    <div class="flex">
                                        <p class="px-4 rounded-full py-2 bg-[#F2F4F7]">{{ message.text }}</p>
                                    </div>
                                </div>
                                <div v-else class="flex flex-col items-end">
                                    <p class="font-bold">{{ message.user.email }}</p>
                                    <div class="flex">
                                        <p class="px-4 rounded-full py-2 bg-blue-400 text-white">{{ message.text }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-[75px] border-t-2 p-4 shrink-0">
                            <p v-if="!userObj.id">Please Log in to post message</p>
                            <input @keyup.enter="createMessage" v-else v-model="message" type="text" class="h-full w-full outline-none font-medium" placeholder="Write your message...">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<style scoped>

</style>