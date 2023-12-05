
<script setup>
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css";
    import VueDatePicker from "@vuepic/vue-datepicker";
    import "@vuepic/vue-datepicker/dist/main.css";
    import { ref } from "vue";
    
    const selectedBrand = ref("");
    const selectBrands = ref([
        { label: "qwe 1", value: "qwe 1" },
        { label: "asd 2", value: "asd 2" },
        { label: "zxc 3", value: "zxc 3" },
    ]);
    
    const selectedCategory = ref("");
    const selectCategories = ref([
        { label: "jewelry", value: "jewelry" },
        { label: "asd 2", value: "asd 2" },
        { label: "zxc 3", value: "zxc 3" },
    ]);
    
    const formSubmitted = ref(false);
    
    const relationshipOptions = ref([
        { label: "Brand Owner", value: "Brand Owner" },
        { label: "Exclusive Distributor", value: "Exclusive Distributor" },
        { label: "Non-Exclusive Distributor", value: "Non-Exclusive Distributor" },
    ]);
    
    const selectedRelationship = ref("");
    
    const submitForm = () => {
        formSubmitted.value = true;
        if (selectedOption) {
        // Handle submission
        }
    };
    
    const handleSelect = (value) => {
        selectedOption.value = value;
    };
     
</script>

<template>
    <div>
        <Header />
        <div class="flex flex-col mt-2 bg-gray-200 rounded-sm mx-auto mr-40 ml-40">
            <div class="flex justify-start">
            <p class="text-xl font-semibold mt-4 ml-5">
                Join Cart & Tell with your Brand
            </p>
            </div>
            <div class="bg-white m-4 gap-4">
            <div class="flex">
                <p class="m-4 mb-2 font-bold text-lg">Your Brand Information</p>
            </div>
            <div class="flex flex-col m-4">
                <p class="font-semibold"><span class="text-red-500">*</span> Brand Name</p>
                <div class="flex">
                <v-select
                    v-model="selectedBrand"
                    :options="selectBrands"
                    placeholder="Select a Brand"
                    @input="handleSelect"
                    filterable
                    class="w-full border-gray-300 rounded-sm"
                ></v-select>
                </div>
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                Profile Link
                </p>
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
                <p class="font-semibold"><span class="text-red-500 font-bold">*</span>
                Relationship with the brand
                </p>
                <div class="flex gap-8">
                <div v-for="(relationship, index) in relationshipOptions" :key="index">
                    <input
                    type="radio"
                    :id="`relationship${index + 1}`"
                    :value="relationship.value"
                    v-model="selectedRelationship"
                    />
                    <label :for="`relationship${index + 1}`">{{ relationship.label }}</label>
                </div>
                </div>
            </div>
            <div class="m-4">
                <p class="text-gray-80 text-sm">You have been authorized by the brand
                owner of the products to be listed on your store, as the non-exclusive
                distributor on Cart & Tell. You must provide a letter of Authorization
                stating non-exclusive rights to distribute on e-Commerce platform(s)
                from the brand owner of your products to be sold.
                </p>
                <p class="font-semibold mt-4"><span class="text-red-500 font-bold">*</span>
                Upload Proof of Authenticity
                </p>
                <div class="w-full h-auto border-2 bg-gray-100">
                <!-- Assuming `UploadFile` is your custom component for file upload -->
                <UploadFile />
                </div>
            </div>
            <div class="m-4">
                <p class="font-semibold mt-4"><span class="text-red-500 font-bold">*</span>
                Brand Authorization Validity Date
                </p>
                <div class="w-[40rem] flex gap-4 mt-1 text-black">
                <VueDatePicker
                    v-model="firstDate"
                    :flow="flow"
                    placeholder="mm/dd/yyyy"
                ></VueDatePicker>
                <VueDatePicker
                    v-model="secondDate"
                    :flow="flow"
                    placeholder="mm/dd/yyyy"
                ></VueDatePicker>
                </div>
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500">*</span> Main Category</p>
                <div class="flex">
                <v-select
                    v-model="selectedCategory"
                    :options="selectCategories"
                    placeholder="Select a Category"
                    @input="handleSelect"
                    filterable
                    class="w-full border-gray-300 rounded-sm"
                ></v-select>
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
  