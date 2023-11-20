<script setup>
    const { product } = defineProps(['product'])
</script>

<template>
    <Header/>
    <div class="container w-full flex justify-center">
        <img :src="product.image" alt="product" class="thumb object-contain h-140 w-50">
        <div>
            <p>{{ product.title }}</p>
            <p>{{ product.price }}</p>
            <p>{{ product.id }}</p>
    
        </div>
    </div>
</template>



<style scoped>

</style>