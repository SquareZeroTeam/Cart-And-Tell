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
        const result = await $fetch<{checkoutLink:string}>(`${API}/paymongo/checkout`,{
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
    <div class="bg-gray-200 h-screen">
        <Header/>
        <div class="container mx-auto w-[1280px] h-[calc(100svh-74px)] p-4 ">
            <div class="my-4 bg-white p-4 rounded-md">
                <p class="font-bold">Selected Items : {{ checkedItems.length }}</p>
            </div>
            <div class="" v-if="pending">loading</div>
            <div v-else v-for="item in userData.cart" class="flex gap-4 bg-white p-4 rounded-md">
                <input type="checkbox" :value="item.id" v-model="checkedItems">
                <div class="flex gap-2">
                    <img :src="item.product.image" alt="" class="h-36 rounded-md">
                    <p>{{ item.product.name }}</p>
                </div>
                <div class="flex-1 flex justify-center items-center">
                    <p class="text-2xl font-bold text-blue-800">
                        ₱{{ item.product.amount }}
                    </p>
                </div>
                <div class="flex-1 flex justify-end items-center gap-5">
                    <button class="h-12 w-12 bg-gray-200">-</button>
                    <p>1</p>
                    <button class="h-12 w-12 bg-gray-300">+</button>
                </div>
            </div>
            <button @click="checkout" class="button mt-4 bg-blue-800 text-white font-bold px-4 py-2 rounded-full">Checkout</button>
        </div>
    </div>
</template>