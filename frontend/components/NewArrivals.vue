<script setup>
    const {data:products} = await useFetch('https://fakestoreapi.com/products');
    const AllProducts = useState('newArrivals',() =>products.value.splice(10,5));
</script>
<template>
    <div class="p-4  w-full sm:w-[512px] sm:h-[700px] flex flex-col shadow-lg rounded-3xl">
        <h2 class="my-4 text-3xl font-bold">New Arrivals</h2>
        <div class="w-full  h-full flex overflow-x-scroll snap-x snap-mandatory">
            <div class="snap-center flex-none h-full w-full flex flex-col justify-center items-center" v-for="products in AllProducts" >
                <img class="h-full max-w-full object-contain" :src="products.image" alt="">
                <p class="text-xl font-semibold p-4">₱{{ (products.price * 10).toFixed(2)}}</p>
            </div>a
        </div>
    </div>
</template>