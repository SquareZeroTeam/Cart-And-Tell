<script setup>
    const {data:products} = await useFetch('https://fakestoreapi.com/products');
    const AllProducts = useState('bestSelling',() =>products.value.splice(5,5));
</script>
<template>
    <div class="bg-white p-4  w-full sm:w-[512px] sm:h-[700px] flex flex-col shadow-lg rounded-3xl my-4">
        <h2 class="my-4 text-3xl font-bold">Best Selling Products</h2>
        <div class="w-full h-full flex overflow-x-scroll snap-x snap-mandatory no-scrollbar">
            <div class="snap-center flex-none h-full w-full flex flex-col justify-center items-center" v-for="products in AllProducts" >
                <img class="h-[calc(100%-60px)] max-w-full object-contain" :src="products.image" alt="">
                <p class="text-xl font-semibold p-4">₱{{ (products.price * 10).toFixed(2)}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .no-scrollbar::-webkit-scrollbar {
          display: none;
      }
      .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
      }
</style>