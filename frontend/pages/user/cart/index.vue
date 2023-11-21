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
    <div>
        <Header/>
        <div class="container mx-auto">
            <h1>Cart</h1>
            <div>Checked names: {{ checkedItems }}</div>
            <div class="" v-if="pending">loading</div>
            <div v-else v-for="item in userData.cart">
                <input type="checkbox" :value="item.id" v-model="checkedItems">
                <p>{{ item.product.name }}</p>
            </div>
            <button @click="checkout" class="button">Checkout</button>
        </div>
    </div>
</template>