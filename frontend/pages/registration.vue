<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css";
    import VueDatePicker from "@vuepic/vue-datepicker";
    import "@vuepic/vue-datepicker/dist/main.css";
    import {useFileDialog, useDropZone} from '@vueuse/core';
    
    enum MerchantRelation {
        MerchantOwner = "MerchantOwner",
        ExclusiveDistributor = "ExclusiveDistributor",
        NonExclusiveDistributor = "NonExclusiveDistributor"
    }

    const userObj = useUserObj().value;
    if (!userObj.isMerchant) {
        throw createError({statusCode: 403,message:"Forbidden User Permission"})
    }
    if (userObj.merchant) {
        await navigateTo('/confirm');
    }
    const API = useRuntimeConfig().public.API;
    const { data: categories } = await useFetch<[{name:string,id:number}]>(`${API}/category`, { lazy: true });

    // Data to store form values
    const formData = reactive<{
        name:string,
        website:string,
        description:string,
        categoryId:number,
        proofOfAuthenticity:File|null,
        image:File|null,
        merchantRelationship:MerchantRelation,
        userId:number,
        merchantStartValidity:Date|null,
        merchantEndValidity:Date|null
    }>({
        name: "",
        website:"",
        description: "",
        categoryId:NaN,
        proofOfAuthenticity: null,
        image:null,
        userId:userObj.id,
        merchantRelationship:MerchantRelation.MerchantOwner,
        merchantEndValidity: null,
        merchantStartValidity: null
    })
    // for Image
    const { files, open, reset, onChange } = useFileDialog({
        accept: 'image/*',
    });
    const {files:files2,open:open2,reset:reset2,onChange:onChange2} = useFileDialog({
        accept: 'application/pdf',
    });

    onChange((files) => {
        formData.image = files![0];
    });
    onChange2((files2) => [
        formData.proofOfAuthenticity = files2![0]
    ])

    const dropZoneRef = ref<HTMLDivElement>()
    function onDrop(files3: File[] | null) {
        formData.proofOfAuthenticity = files3![0]
    }
    const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    // specify the types of data to be received.
    dataTypes: ['application/pdf']
    })
    const previewPDF = ref<any>(null);
    const previewImage = ref<any>(null);
    const errorMSG = ref<any>(null);
    watch(() => formData.proofOfAuthenticity, (file) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                previewPDF.value = reader.result;
            };
        }
    });
    watch(() => formData.image, (file) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                previewImage.value = reader.result;
            };
        }
    });
    const relationshipOptions = ref([
        { label: "Merchant Owner", value: "MerchantOwner" },
        { label: "Exclusive Distributor", value: "ExclusiveDistributor" },
        { label: "Non-Exclusive Distributor", value: "NonExclusiveDistributor" },
    ]);

    const submitForm = async () => {
        let isError = false;
        console.log(formData);
        const FData = new FormData();
        FData.append("name", formData.name);
        FData.append("website", formData.website);
        FData.append("description", formData.description);
        FData.append("categoryId", formData.categoryId.toString());
        FData.append("merchantRelationship", formData.merchantRelationship);
        FData.append("merchantStartValidity", formData.merchantStartValidity!.toString());
        FData.append("merchantEndValidity", formData.merchantEndValidity!.toString());
        FData.append("proofOfAuthenticity", formData.proofOfAuthenticity!);
        FData.append("image", formData.image!);
        FData.append("userId", formData.userId.toString());
        let data = await $fetch<{id:number}>(`${API}/merchant`, {
            method: "POST",
            body: FData,
            headers:{
                Authorization: `Bearer ${useCookie('token').value}`
            }
        }).catch(error => {
            errorMSG.value = error.data;
            isError = true;
        })
        if (!isError) {
            data = data as {id:number}
            userObj.merchant = {id:data.id};
            navigateTo('/confirm');
        }
    };

</script>

<template>
    <div>
        <Header />
        <div class="container mx-auto flex flex-col sm:flex-row mt-2">
            <div class="hidden sm:hidden lg:flex">
                <SideBar />
            </div>
            <div class="flex flex-col mt-4 mb-4 bg-gray-200 rounded-sm mx-auto mr-24 ml-24">
                <div class="flex justify-start">
                    <p class="text-xl font-semibold mt-4 ml-5">
                        Join Cart & Tell as a Merchant
                    </p>
                </div>
                <div class="bg-white m-4 gap-4">
                    <div class="flex">
                        <p class="m-4 mb-2 font-bold text-lg">Your Merchant Information</p>
                    </div>
                    <div class="flex flex-col m-4">
                        <p class="font-semibold"><span class="text-red-500">*</span> Merchant Image</p>
                        <input @click="(open as any)" class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file">
                        <p class="mt-1 text-sm" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>
                    <div class="flex justify-center flex-col h-" v-if="formData.image">
                        <p class="font-bold p-4">Preview Image</p>
                        <img class="object-contain h-[500px]" :src="previewImage" alt="">
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Merchant Name
                        </p>
                        <input
                            v-model="formData.name"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Website Link
                        </p>
                        <input
                            v-model="formData.website"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Description
                        </p>
                        <textarea v-model="formData.description" name="" id="" class="w-full h-[150px] resize-none p-4" maxlength="255"></textarea> 
                    </div>
                    <div class="m-4">
                        <p class="font-semibold">
                            <span class="text-red-500 font-bold">*</span> Relationship with the Merchant
                        </p>
                        <div class="flex flex-col sm:flex-row md:flex-row gap-4 mt-2 text-black">
                            <div v-for="(relationship, index) in relationshipOptions" :key="index">
                                <input
                                    type="radio"
                                    :id="`relationship${index + 1}`"
                                    :value="relationship.value"
                                    v-model="formData.merchantRelationship"
                                />
                                <label :for="`relationship${index + 1}`">{{ relationship.label }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="m-4">
                        <p class="text-gray-80 text-sm">You have been authorized by the merchant
                            owner of the products to be listed on your store, as the non-exclusive
                            distributor on Cart & Tell. You must provide a letter of Authorization
                            stating non-exclusive rights to distribute on e-Commerce platform(s)
                            from the merchant owner of your products to be sold.
                        </p>
                        <p class="font-semibold mt-4"><span class="text-red-500 font-bold">*</span>
                            Upload Proof of Authenticity
                        </p>
                        <div class="w-full h-full border-2 bg-gray-100">
                            <!-- <UploadFile /> -->
                            <div class="flex items-center justify-center w-full" ref="dropZoneRef">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input @click="(open2 as any)" id="dropzone-file" type="file" class="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div v-if="formData.proofOfAuthenticity">
                            <p class="font-bold py-4">Preview PDF</p>
                            <object :data="previewPDF" type="application/pdf" width="100%" height="500px"></object>
                            <button class="mt-4 px-4 py-2 border-2 font-bold" @click="formData.proofOfAuthenticity = null">Reset PDF</button>
                        </div>
                    </div>
                    <div class="m-4">
                        <p class="font-semibold mt-4">
                            <span class="text-red-500 font-bold">*</span> Merchant Authorization Validity Date
                        </p>
                        <div class="w-full sm:w-[26rem] flex flex-col sm:flex-row md:flex-row gap-4 mt-1 text-black">
                            <!-- <VueDatePicker v-model="formData.merchantStartValidity" placeholder="mm/dd/yyyy"></VueDatePicker>
                            <VueDatePicker v-model="formData.merchantEndValidity" placeholder="mm/dd/yyyy"></VueDatePicker> -->
                            <div>
                                <p class="font-semibold"><span class="text-red-500">*</span> Start Date</p>
                                <input v-model="formData.merchantStartValidity" type="date" name="" id="">
                            </div>
                            <div>
                                <p class="font-semibold"><span class="text-red-500">*</span> End Date</p>
                                <input v-model="formData.merchantEndValidity" type="date" name="" id="">
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                            <div class="m-4">
                                <p class="font-semibold"><span class="text-red-500">*</span> Main Category</p>
                                <div class="flex ">
                                    <select v-model="formData.categoryId" class="w-full p-1 border-gray-200 border-2 rounded-sm">
                                        <option value="" disabled>Select a Category</option>    
                                        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }} </option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    <button @click="submitForm" class="p-2 m-4 bg-[#6DB7FB] text-white rounded-sm">Register Now</button>
                    <div>
                        <p class="text-sm text-gray-80 px-4">By clicking the button above, you agree to our <span class="text-blue-500">Terms of Service</span> and <span class="text-blue-500">Privacy Policy</span>.</p>
                        <div class="p-4">
                            <p class="text-red-500 font-bold">{{ (errorMSG) ? errorMSG.message : "" }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input[type=file]::-webkit-file-upload-button {
        visibility: hidden;
    }
</style>
