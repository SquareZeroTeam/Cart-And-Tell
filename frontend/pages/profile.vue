<script setup lang="ts">
        const API = useRuntimeConfig().public.API;
    const APILINK = `${API}/merchant/4`;
    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE';

    
    const { data: merchant } = useFetch(APILINK, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${ADMINTOKEN}`,
        },
    });

    const { files, open, reset, onChange } = useFileDialog({
        accept: 'image/*',
    });

    let isImageChange = false;
    onChange((files) => {
                    const dataImage = new FormData();
            dataImage.append("image", files[0]);
            isImageChange = true;
            fetch(APILINK, {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + ADMINTOKEN,
                },
                body: dataImage,
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error updating image:', error.data));
            });

    const submitForm = async () => {
        const formData = new FormData();
        formData.append('name', merchant.value.name);
        formData.append('description', merchant.value.description);
        formData.append('website', merchant.value.website);

        try {
            await $fetch(APILINK, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${ADMINTOKEN}`,
                },
                body: formData,
            });

            //console.log('Merchant data updated successfully!');
        } catch (error) {
            //console.error('Error updating merchant data:', error.data);
        }
        //console.log(merchant.value);
    };
</script>
<template>
    <div class="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
                <SideBar />
            </div>

            <div class="w-full bg-white lg:mr-12">
                <div class="flex flex-col gap-4">  
                    <div class="bg-[#282F7A] flex items-center">
                        <div class="flex m-6">
                            <div class="text-white w-48 h-48 border-dashed border-2 border-gray-300 rounded-md">
                                <button class="flex justify-center items-center mx-auto mt-[5rem]" type="button" @click="open()" >
                                    <p class="">Choose Image</p>
                                    <img v-if="isImageChange" class=" object-contain" :src="merchant.image">
                                </button>
                                <!-- <button type="button" :disabled="!files" @click="reset()">
                                    Reset
                                </button> -->
                                
                            </div>
                            <div>
                                <input
                                    class="h-[3rem] w-[16rem] sm:w-auto text-black ml-6 text-3xl font-bold mt-2 rounded-md flex"
                                    placeholder="Merchant Name"
                                    v-model="merchant.name"
                                />
                            </div>
                        </div>

                    </div>
                    <div class="bg-[#282F7A] h-[24rem]">
                        <div class="flex justify-center flex-col">
                            <span class="text-[#6DB7FB] text-2xl mt-2 ml-6 font-bold">Description:</span>
                            <textarea
                                class="text-black ml-6 text-3xl rounded-md m-4 h-[10rem] "
                                placeholder="Insert About Merchant Here"
                                v-model="merchant.description"
                            ></textarea>
                            <span class="text-[#6DB7FB] text-2xl mt-2 ml-6 font-bold">Link:</span>
                            <input
                                class="text-black ml-6 text-3xl rounded-md m-4 h-[3rem]"
                                v-model="merchant.website"
                            />
                        </div>
                    </div>
                    <div class="bg-[#282F7A] flex flex-col justify-center">
                        <p class="text-white mt-2  text-2xl text-center">Products</p>
                        <SlideMerchantProduct/>
                        <NuxtLink to="/addproduct">
                            <button class="flex justify-center items-center m-2  mx-auto">
                                <p class="p-2 w-[20rem] bg-[#6DB7FB] text-white rounded-md text-4xl font-bold">Add Product Here</p>
                            </button>
                        </NuxtLink>
                        
                    </div>
                    <button @click="submitForm" class="p-2 bg-[#6DB7FB] text-white rounded-sm text-4xl font-bold">Register Now</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>