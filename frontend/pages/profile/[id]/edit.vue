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
    if (userObj.merchant?.isVerified != merchant.value.isVerified) {
        userObj.merchant!.isVerified = merchant.value.isVerified;
    }
    if (error.value?.statusCode == 404) {
        throw createError({statusCode:404,statusMessage:"Merchant Not Found"});
    }
    if (userObj!.merchant!.id !== parseInt(id as string)) {
        throw createError({statusCode:403,statusMessage:"Forbidden Access"});
    }
    const formData = reactive<{
        name:string,
        website:string,
        description:string,
        image:File|null,
    }>({
        name: "",
        website:"",
        description: "",
        image:null,
    })
    const prevImage = ref(merchant.value.image);
    
    // First instance
    const { files: files1, open: open1, reset: reset1, onChange: onChange1 } = useFileDialog({
    accept: 'image/*',
    });

    onChange1((files1) => {
    formData.image = files1![0];
    });
    watch(() => formData.image, (val) => {
        if (val) {
            const reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onload = () => {
                prevImage.value = reader.result as string;
                console.log(prevImage.value)
            }
        }
    })
    async function update() {
        let isError = false;
        const formDataCreate = new FormData();
        if (formData.name) {
            formDataCreate.append('name',formData.name);
        }
        if (formData.website) {
            formDataCreate.append('website',formData.website);
        }
        if (formData.description) {
            formDataCreate.append('description',formData.description);
        }
        if (formData.image) {
            formDataCreate.append('image',formData.image!);
        }
        console.log(formData);
        const token = useCookie('token');
        const data = await $fetch<{message:string}>(`${API}/merchant/${id}`,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formDataCreate
        }).catch(error => {
            alert(error.data.message);
            isError = true
            return;
        })
        if (!isError) {
            navigateTo(`/profile/${id}`);
        }
    }
    onBeforeMount(() => {
        const {token} = useRoute().query;
        if (token) {
            useCookie('token').value = token as string;
        }
        
    })
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
                        <div class="m-6 flex w-full">
                            <div>
                                <!-- <img class="w-48 h-auto rounded-md" :src="merchant.image" alt="Introduction Image"> -->
                                <div class="flex items-center justify-center w-full relative">
                                    <img @click="(open1 as any)" :src="prevImage" alt="" class="absolute w-48 cursor-pointer">
                                    <label class="flex flex-col  w-48 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div class="flex flex-col items-center justify-center pt-7">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                Select a photo</p>
                                        </div>
                                        <input @click="(open1 as any)" type="file" class="opacity-0" />
                                    </label>
                                </div>
                            </div>
                            <div class="flex items-start justify-between w-full">
                                <input v-model="formData.name" type="text" class="rounded-md text-3xl font-bold ml-6 mt-2 p-2" :placeholder="merchant.name">
                                <button @click="update" class="h-[52px] bg-green-500 text-white font-bold  px-4 py-2 text-lg rounded-full">Apply Changes</button>
                                <!-- <p class="text-white ml-6 text-3xl font-bold  mt-2">{{merchant.name}}</p> -->
                            </div>
                        </div>                
                    </div>
                    <div class="bg-[#282F7A]">
                        <div class="flex flex-col gap-4">
                            <div class="p-6">
                                <p class="text-white  text-2xl font-bold">Description:</p>
                                <textarea v-model="formData.description" class="w-full p-4 rounded-md" :placeholder="merchant.description"></textarea>
                            </div>
                            <div class="p-6">
                                <p class="text-white  text-2xl font-bold">Website Link:</p>
                                <input type="text" v-model="formData.website" class="w-full p-4 rounded-md" :placeholder="merchant.website"/>
                            </div> 
                        </div>  
                    </div>
                    <!-- <div class="bg-[#282F7A] flex flex-col justify-center">
                        <p class="text-white mt-2  text-2xl text-center">Products</p>
                        <SlideProduct :products="merchant.products"/>        
                    </div> -->
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