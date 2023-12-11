<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const APILINK = `${API}/merchant/4/products`;
    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE';
    const { data: products } = useFetch(APILINK, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${ADMINTOKEN}`,
        },
    });

    console.log(products.value)


    const submitForm = async () => {
        const formData = new FormData();
        formData.append('name', products.value[products.value.length - 1].name);

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

        // Create a new index in products
        products.value.push({ name: '' });

        console.log(products.value);
        console.log("TEST");
        console.log(products.value.length - 1);
    };
</script>

<template>
    <div class="">
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
                                <!-- <button class="flex justify-center items-center mx-auto mt-[5rem]" type="button" @click="open()" >
                                    <p class="">Choose Image</p>
                                </button>      -->
                            </div>  
                            <div>
                                <input
                                    class="h-[3rem] w-[16rem] sm:w-auto text-black ml-6 text-3xl font-bold mt-2 rounded-md flex"
                                    placeholder="Product Name"
                                    v-model="products.name"
                                />
                            </div>
                        </div>
                    </div>
                    <button @click="submitForm" class="p-2 bg-[#6DB7FB] text-white rounded-sm text-4xl font-bold">Register Now</button>
                
                </div>
            </div>
        </div>
    </div>

</template>



<style scoped>
    
</style>