<script setup>
    import { ref, reactive } from 'vue';
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css";
    import VueDatePicker from "@vuepic/vue-datepicker";
    import "@vuepic/vue-datepicker/dist/main.css";
    import {useFileDialog} from '@vueuse/core';
    
    const API = useRuntimeConfig().public.API;
    const { data: categories } = useFetch(`${API}/category`, { lazy: true });
    const {data:merchant} = useFetch(`${API}/merchant/4`);
    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE';

    //console.log(merchant.value);

    // Data to store form values
    const formData = reactive({
        merchantName: '',
        merchantLink: '',
        selectedRelationship: '',
        firstDate: '',
        secondDate: '',
        selectedCategory: '',
        password: '',
        confirmPassword: '',
    });

    const { file, open, reset, onChange } = useFileDialog({
        accept: 'image/*',
    });

    onChange((files) => {
        const formData = new FormData();
        formData.append("image", files[0]);
        console.log(formData.get("image"));
    });
    


    const relationshipOptions = ref([
        { label: "Merchant Owner", value: "Merchant Owner" },
        { label: "Exclusive Distributor", value: "Exclusive Distributor" },
        { label: "Non-Exclusive Distributor", value: "Non-Exclusive Distributor" },
    ]);


    const submitForm = async () => {
        const userObj = useUserObj();
        //userObj.value.isMerchant = true;
        localStorage.setItem('isMerchant', 'true'); 
        console.log(userObj.value.isMerchant);
        formDataCreated = new FormData();
        formDataCreated.append('name', formData.merchantName)

        try {
            await $fetch(`${API}/merchant/4`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${ADMINTOKEN}`,
                },
                body: userObj.value.isMerchant,
            });

            //console.log('Merchant data updated successfully!');
        } catch (error) {
            //console.error('Error updating merchant data:', error.data);
        }
        //console.log(merchant.value);
    };

    // On page load, retrieve the value from local storage and set it in the userObj
    onMounted(() => {
        const isMerchant = localStorage.getItem('isMerchant');
        if (isMerchant === 'true') {
            const userObj = useUserObj();
            userObj.value.isMerchant = true;
        }
    });
    const handleSelect = (value) => {
        formData.value.selectedmerchant = value;
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
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer" aria-describedby="file_input_help" id="file_input" type="file">
                        <p class="mt-1 text-sm" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        <div class="flex justify-center">
                            <img src="" alt="">
                        </div>
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Merchant Name
                        </p>
                        <input
                            v-model="formData.merchantName"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Profile Link
                        </p>
                        <input
                            v-model="formData.merchantLink"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
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
                                    v-model="formData.selectedRelationship"
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
                            <UploadFile />
                        </div>
                    </div>
                    <div class="m-4">
                        <p class="font-semibold mt-4">
                            <span class="text-red-500 font-bold">*</span> Merchant Authorization Validity Date
                        </p>
                        <div class="w-full sm:w-[26rem] flex flex-col sm:flex-row md:flex-row gap-4 mt-1 text-black">
                            <VueDatePicker v-model="formData.firstDate" placeholder="mm/dd/yyyy"></VueDatePicker>
                            <VueDatePicker v-model="formData.secondDate" placeholder="mm/dd/yyyy"></VueDatePicker>
                        </div>
                    </div>
                    <div class="flex">
                            <div class="m-4">
                                <p class="font-semibold"><span class="text-red-500">*</span> Main Category</p>
                                <div class="flex ">
                                    <select v-model="formData.selectedCategory" class="w-full p-1 border-gray-200 border-2 rounded-sm" @input="handleSelect">
                                        <option value="" disabled>Select a Category</option>
                                        <option v-for="category in categories" :value="category.name" :key="category.id">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Password
                        </p>
                        <input
                            v-model="formData.password"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
                    </div>
                    <div class="m-4">
                        <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                            Confirm Password
                        </p>
                        <input
                            v-model="formData.confirmPassword"
                            type="text"
                            id="textInput"
                            name="textInput"
                            class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder=""
                        />
                    </div>
                    <NuxtLink to="/">
                        <button @click="submitForm" class="p-2 m-4 bg-[#6DB7FB] text-white rounded-sm">Register Now</button>
                    </NuxtLink>
                    
                   
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
