<script setup lang="ts">

    const checkedItems = ref([]);
    const API = useRuntimeConfig().public.API;
    const token = useCookie('token').value;
    const userObj = useUserObj().value;
    if (!userObj.loggedIn) {
        await navigateTo('/');
    }
    interface CartObj {
        id: number,
        product: {
            id: number,
            name: string,
            image: string,
            amount: number
        },
        quantity: number
    }
    const {data:cart,pending,refresh} = await useLazyFetch<[CartObj]>(`${API}/user/${userObj.id}/cart`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
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
    async function increment(e:Event) {
        const buttonDiv = e.target as HTMLElement
        const id = buttonDiv.id;
        const data = await $fetch<any>(`${API}/user/${userObj.id}/cart/${id}/increment`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).catch( error => alert(error.data.message));
        if (data) {
            cart.value?.findIndex((item:CartObj) => {
                if (item.id === parseInt(id)) {
                    item.quantity = data.quantity;
                }
            });
        }
    }
    async function decrement(e:Event) {
        const buttonDiv = e.target as HTMLElement
        const id = buttonDiv.id;
        const data = await $fetch<any>(`${API}/user/${userObj.id}/cart/${id}/decrement`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).catch( error => alert(error.data.message));
        if (data) {
            cart.value?.findIndex((item:CartObj) => {
                if (item.id === parseInt(id)) {
                    item.quantity = data.quantity;
                }
            });
        }
    }
    async function remove(e:Event) {
        const buttonDiv = e.target as HTMLElement;
        const id = buttonDiv.id;
        const data = await $fetch<any>(`${API}/user/${userObj.id}/cart`,{
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body:JSON.stringify({products:[id]})
        }).catch( error => alert(error.data.message));
        if (data) {
            cart.value?.splice(cart.value?.findIndex((item:CartObj) => item.id === parseInt(id)),1);
        }
    }
</script>
<template>
    <div class="bg-gray-100 ">
        <Header />
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
            <SideBar />
        </div>
        <div class="container mx-auto justify-center items-center w-full mt-[4em] lg:pr-48 lg:pl-48 h-screen">
            <div class="flex justify-end text-lg ml-auto bg-white">
                <p class="mt-4 mb-4 mr-8 ml-10">Quantity</p>
                <p class="mt-4 mb-4 mr-8 ml-10">Total Price</p>
            </div>
            <div class="flex items-center  rounded-md bg-white">
                <!-- <input type="checkbox" :value="item.id" v-model="checkedItems" class="ml-12 h-4 w-4 rounded-sm text-[#2563EB] focus:ring-[#2563EB] ring-2 ring-offset-2 ring-offset-white" /> -->
                <div class="text-lg"></div>
            </div>
            <div v-if="pending">Loading...</div>
            <div v-else v-for="item in cart" class="mt-4">
                <div class="shadow-sm mt-8 rounded-md bg-white">
                    <div class="flex justify-center">
                        <img :src="item.product.image" alt="" class="h-36 rounded-md m-4 sm:hidden">
                    </div>
                    <div class="flex items-center bg-white productItem">
                        <input type="checkbox" v-model="checkedItems" :value="item.id" class="flex-shrink-0 ml-12 h-4 w-4 rounded-md text-[#2563EB] focus:ring-[#2563EB] ring-1 ring-offset-1 ring-offset-white" />
                        <img :src="item.product.image" alt="" class="h-36 rounded-md m-4 hidden sm:block">
                        <p class=" text-ellipsis">{{ item.product.name }}</p>
                        <div class="flex justify-end text-lg ml-auto">
                            <div class="flex justify-center items-center">
                                <button :id="item.id.toString()" @click="decrement" class="px-4 py-2 bg-gray-300 text-black">-</button>
                                <p class="mt-4 mb-4 mr-10 ml-10">{{item.quantity}}</p>
                                <button :id="item.id.toString()" @click="increment" class="px-4 py-2 bg-gray-300 text-black">+</button>
                            </div>
                            <p class="mt-4 mb-4 mr-10 ml-10 text-[#2563EB] font-semibold">₱{{item.product.amount}}</p>
                        </div>
                        <div class="hidden justify-end text-lg mr-4">
                            <button :id="item.id.toString()" @click="remove" class="px-4 py-2 bg-gray-300 text-black">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="checkout" class="bg-blue-600 text-white font-bold px-6 py-2 border-2 border-transparent rounded-full my-4">Checkout</button>
            </div>
        </div>
    </div>
  </template>
  
<style scoped>
    .productItem:hover > .hidden {
        display: flex;
    }
</style>