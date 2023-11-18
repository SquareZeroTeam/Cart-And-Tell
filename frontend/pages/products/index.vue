<template>
    <Header/>
    <div class="container mx-auto mt-8 pr-20 pl-20">
        <div class="flex justify-center">
            <div class="w-auto flex justify-center m-4">
                <div class="flex justify-start items-center h-3 w-32 pt-0 mt-0">
                    <span class="material-symbols-outlined">filter_alt</span>
                    <p>Search Filter</p>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-3">
                <div v-for="p in products">
                    <ProductCard :product="p"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

//Fetch the data from the fakestoreapi
const { data: products } = await useFetch('https://fakestoreapi.com/products');
</script>

<style scoped>

</style>