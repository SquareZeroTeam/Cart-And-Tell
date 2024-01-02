<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const userObj = useUserObj().value;
    const {id} = useRoute().params;
    const loading = ref(false);
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
        if (loading.value) {
            return;
        }
        loading.value = true;
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
            loading.value = false;
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
                                <div class="flex items-center justify-center w-full relative h-[192px]">
                                    <img @click="(open1 as any)" :src="prevImage" alt="" class="absolute w-48 h-48 object-fit rounded-md cursor-pointer">
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
                                <button v-if="!loading" @click="update" class="h-[52px] bg-green-500 text-white font-bold  px-4 py-2 text-lg rounded-full">Apply Changes</button>
                                <button v-else class="h-[52px] bg-green-500 text-white font-bold  px-4 py-2 text-lg rounded-full">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        class="inline mr-3 w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                        ></path>
                                        <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                        ></path>
                                    </svg>
                                    Apply Changes
                                </button>
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