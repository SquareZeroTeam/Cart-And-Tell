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
    <div class="bg-gray-100 h-screen">
        <Header />
        <div class="container mx-auto justify-center items-center w-full mt-[4em] lg:pr-48 lg:pl-48">
            <div class="" v-if="pending">loading</div>
            <div v-else v-for="item in userData.cart">
                <div class="flex items-center shadow-lg rounded-md bg-white">
                    <input type="checkbox" :value="item.id" v-model="checkedItems" class="ml-12 h-4 w-4 rounded-sm text-[#2563EB] focus:ring-[#2563EB] ring-2 ring-offset-2 ring-offset-white" />
                    <div class="text-lg">Checked Products: {{ checkedItems }}</div>
                    <div class="flex justify-end text-lg ml-auto">
                        <p class="mt-4 mb-4 mr-8 ml-10">Quantity</p>
                        <p class="mt-4 mb-4 mr-8 ml-10">Total Price</p>
                    </div>
                </div>
                <div class="shadow-lg mt-8 rounded-md bg-white">
                    <div class="flex items-center">
                        <input type="checkbox" class="ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class="m-4 text-lg">Cathay Land Inc.(Merchant)</p>
                    </div>
                    <div class="border-b border-gray-300 my-4"></div>
                    <div class="flex justify-center">
                        <img :src="item.product.image" alt="" class="h-36 rounded-md m-4 sm:hidden">
                    </div>
                    <div class="flex items-center bg-white">
                        <img :src="item.product.image" alt="" class="h-36 rounded-md m-4 hidden sm:block">
                        <input type="checkbox" class="flex-shrink-0 ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <p class=" text-ellipsis">{{ item.product.name }}</p>
                        <div class="flex justify-end text-lg ml-auto">
                            <p class="mt-4 mb-4 mr-10 ml-10">{{item.quantity}}</p>
                            <p class="mt-4 mb-4 mr-10 ml-10 text-[#2563EB] font-semibold">₱{{item.product.amount}}</p>
                        </div>
                    </div>
                
                </div>
                <footer class=" shadow-2xl bottom-0 relative mt-[2rem] rounded-md bg-white">
                <div class="mx-auto flex justify-between ">
                    <div class="flex items-center">
                        <input type="checkbox" :value="item.id" v-model="checkedItems" class="ml-12 mr-4 h-4 w-4 rounded-sm text-[#2563EB] focus:ring-[#2563EB] ring-2 ring-offset-2 ring-offset-white" />
                    <div class="text-lg">Select All {{ checkedItems }}</div>
                    </div>
                    <div class="flex items-center justify-end mr-8">
                        <button @click="checkout" class="button mt-4 bg-blue-800 text-white font-bold px-4 py-2 rounded-full mb-4">Checkout</button>
                    </div>
                </div>
            </footer>
            </div>
            
        </div>
    </div>
  </template>
  