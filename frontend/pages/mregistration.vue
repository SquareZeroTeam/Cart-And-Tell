<script setup>
    import { ref } from 'vue';
    import vSelect from "vue-select";
    import "vue-select/dist/vue-select.css";
    import VueDatePicker from "@vuepic/vue-datepicker";
    import "@vuepic/vue-datepicker/dist/main.css";

    // Data to store form values
    const formData = ref({
    selectedBrand: '',
    brand: '',
    selectedRelationship: '',
    firstDate: '',
    secondDate: '',
    selectedCategory: '',
    });

    const selectBrands = ref([
    { label: "qwe 1", value: "qwe 1" },
    { label: "asd 2", value: "asd 2" },
    { label: "zxc 3", value: "zxc 3" },
    ]);

    const selectCategories = ref([
    { label: "jewelry", value: "jewelry" },
    { label: "asd 2", value: "asd 2" },
    { label: "zxc 3", value: "zxc 3" },
    ]);

    const relationshipOptions = ref([
    { label: "Brand Owner", value: "Brand Owner" },
    { label: "Exclusive Distributor", value: "Exclusive Distributor" },
    { label: "Non-Exclusive Distributor", value: "Non-Exclusive Distributor" },
    ]);

    const formSubmitted = ref(false);

    const submitForm = () => {
    formSubmitted.value = true;


    console.log(formData.value);


    };

    const handleSelect = (value) => {
    formData.value.selectedBrand = value;
    };

</script>

<template>
    <div>
        <Header />
        <div class="flex flex-col mt-4 mb-4 bg-gray-200 rounded-sm mx-auto mr-24 ml-24">
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
                <p class="font-semibold">
                    <span class="text-red-500 font-bold">*</span> Relationship with the brand
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
                <p class="text-gray-80 text-sm">You have been authorized by the brand
                owner of the products to be listed on your store, as the non-exclusive
                distributor on Cart & Tell. You must provide a letter of Authorization
                stating non-exclusive rights to distribute on e-Commerce platform(s)
                from the brand owner of your products to be sold.
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
                    <span class="text-red-500 font-bold">*</span> Brand Authorization Validity Date
                </p>
                <div class="w-full sm:w-[26rem] flex flex-col sm:flex-row md:flex-row gap-4 mt-1 text-black">
                    <VueDatePicker v-model="firstDate" :flow="flow" placeholder="mm/dd/yyyy"></VueDatePicker>
                    <VueDatePicker v-model="secondDate" :flow="flow" placeholder="mm/dd/yyyy"></VueDatePicker>
                </div>
            </div>
            <div class="m-4">
                <p class="font-semibold"><span class="text-red-500">*</span> Main Category</p>
                <div class="flex m">
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
            <button @click="submitForm" class="p-2 m-4 bg-[#282F7A] text-white rounded-sm">Register Now</button>
            <span v-if="!selectedOption && formSubmitted" class="text-red-500">Please Fill up the required inputs</span>
            </div>
        </div>
        </div>
</template>
  
  
<style scoped>
  
</style>
  