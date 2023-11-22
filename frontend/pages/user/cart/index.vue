<script setup lang="ts">

    const checkedItems = ref([]);
    const API = useRuntimeConfig().public.API;
    const token = useCookie('token').value;
    const {data:userData,pending} = await useLazyFetch<any>(`${API}/auth/validate`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(userData.value);
    watch(checkedItems, () => {
        console.log(checkedItems.value);
    })
    async function checkout() {
        const result = await $fetch<any>(`${API}/paymongo/checkout`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({data:checkedItems.value})
        }).catch(err => console.log(err.data));
        const link = (result) ? result.checkoutLink: "";
        if (link) {
            await navigateTo(link,{external:true});
        } 
    }
</script>
<template>
    <div>
        <Header />
        <div class="container mx-auto justify-center items-center w-full mt-[4em] lg:pr-48 lg:pl-48">
            <div class="" v-if="pending">loading</div>
            <div v-else v-for="item in userData.cart">
                <div class="flex items-center shadow-lg">
                    <input type="checkbox" :value="item.id" v-model="checkedItems" class="ml-12 mr-4 h-4 w-4 rounded-sm text-[#2563EB] focus:ring-[#2563EB] ring-2 ring-offset-2 ring-offset-white" />
                    <div class="text-lg">Checked Products: {{ checkedItems }}</div>
                    <div class="flex justify-end text-lg ml-auto">
                        <p class="mt-4 mb-4 mr-10 ml-10">Unit Price</p>
                        <p class="mt-4 mb-4 mr-10 ml-10">Quantity</p>
                        <p class="mt-4 mb-4 mr-10 ml-10">Total Price</p>
                    </div>
                </div>
                <div class="shadow-lg mt-8">
                    <div class="flex items-center">
                        <input type="checkbox" class="ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class="m-4 text-lg">FakeStoreAPI</p>
                    </div>
                    <div class="border-b border-gray-300 my-4"></div>

    
                    <div class="flex items-center">
                        <input type="checkbox" class="ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class="m-4">{{ item.product.name }}</p>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class="m-4">{{ item.product.name }}</p>
                    </div>
                
                </div>
            </div>
            <footer class="bg-[#2563EB]  shadow-2xl bottom-0 relative">
                <div class="mx-auto flex">
                    <div class="flex items-center">
                        <input type="checkbox" class="ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class="m-10">Select All {{ checkedItems }}</p>
                    </div>
                    <div class="flex items-center justify-end">
                        <button @click="checkout" class="button">Checkout</button>
                    </div>
                </div>
            </footer>
        </div>
    </div>
  </template>
  