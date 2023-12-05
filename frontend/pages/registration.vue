
<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css"; 
import { ref } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


    export default {
        components: {
            vSelect,
            VueDatePicker,
        },
        data() {
            return {
                date:null,
                selectedBrand: "",
                selectBrands: [
                    { label: "qwe 1", value: "qwe 1" },
                    { label: "asd 2", value: "asd 2" },
                    { label: "zxc 3", value: "zxc 3" },
                ],
                
                selectedCategory: "",
                selectCategories: [
                    { label: "jewelry", value: "jewelry" },
                    { label: "asd 2", value: "asd 2" },
                    { label: "zxc 3", value: "zxc 3" },
                ],
                formSubmitted: false,
            };
        },
        methods: {
            submitForm() {
                this.formSubmitted = true;
                    if (this.selectedOption) {
                    // ror
                }
            },
            handleSelect(value) {
                this.selectedOption = value;
            },
        },
    };
</script>

<template>
    <div>
        <Header/>
        <div class="flex flex-col mt-2 bg-gray-200 rounded-sm mx-auto mr-40 ml-40">
        <div class="flex justify-start">
            <p class="text-xl font-semibold mt-4 ml-5">Join Cart & Tell with your Brand</p>
        </div>
        <div class="bg-white m-4 gap-4">
            <div class="m-4">
                <p class="mb-2 font-bold text-lg">Your Brand Information</p>
                <p class="font-semibold"><span class="text-red-500">*</span> Brand Name</p>
                <div class="flex">
                    <v-select v-model="selectedBrand" :options="selectBrands" placeholder="Select an Brand" @input="handleSelect" filterable class="w-full  border-gray-300 rounded-sm" ></v-select>
                </div>
                
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500 font-bold">*</span> Profile Link</p>
                <input
                v-model="brand"
                type="text"
                id="textInput"
                name="textInput"
                class="mt-1 p-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder=""
                />
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500 font-bold">*</span> Relationship with the brand</p>
                <div class="flex gap-8">
                    <div>
                        <input type="radio" name="relationship" v-model="selectedRelationship">
                        <label for="relationship1">Brand Owner</label>
                    </div>
                    <div>
                        <input type="radio" name="relationship" v-model="selectedRelationship">
                        <label for="relationship2">Exclusive Distributor</label>
                    </div>
                    <div>
                        <input type="radio" name="relationship" v-model="selectedRelationship">
                        <label for="relationship3">Non-Exclusive Distributor</label>
                    </div>
                </div>
            </div>
            <div class="m-4">
                <p class="text-gray-80 text-sm">You have been authorized by the brand ownder of the products to be listed on your store, ast he non-exclusive distributor on Cart & Tell. You must provide a letter of Authorization stating non-exclusive rights to distribute on e-Commerce platform(s) from the brand owner of your products to be sold.</p>
                <p class="font-semibold mt-4"><span class="text-red-500 font-bold">*</span> Upload Proof of Authenticity</p>
            </div>
            <div class="m-4">
                <p class="font-semibold mt-4"><span class="text-red-500 font-bold">*</span> Brand Authorization Validity Date</p>
                <div class="w-[40rem] flex gap-4 mt-1 text-black">
                    <VueDatePicker v-model="firstDate" ></VueDatePicker>
                    <VueDatePicker v-model="secondDate" ></VueDatePicker>
                </div>
                
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500">*</span> Main Category</p>
                <div class="flex">
                    <v-select v-model="selectedCategory" :options="selectCategories" placeholder="Select a Category" @input="handleSelect" filterable class="w-full  border-gray-300 rounded-sm" ></v-select>
                </div>
                
            </div>
            <button @click="submitForm" class="p-2 mt-4 bg-blue-500 text-white rounded-sm">Submit</button>
            <span v-if="!selectedOption && formSubmitted" class="text-red-500">Please select an option</span>
        </div>
        
        </div>
    </div>
</template>
  
<style scoped>

</style>
  