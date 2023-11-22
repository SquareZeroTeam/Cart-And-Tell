<script setup>
    const {data:products} = await useFetch('https://fakestoreapi.com/products');
    const AllProducts = useState('topProducts',() => products.value.splice(15));
</script>
<template>
    <div class="bg-white p-4  w-full sm:w-[512px] sm:h-[700px] flex flex-col shadow-lg rounded-3xl my-4">
        <h2 class="my-4 text-3xl font-bold">Top Ranking</h2>
        <div class="w-full h-full flex overflow-x-scroll snap-x snap-mandatory no-scrollbar">
            <NuxtLink class="snap-center flex-none h-full w-full " v-for="products in AllProducts" :to="`/products/${products.id}`">
                <div class="h-full w-full flex flex-col justify-center items-center">
                    <img class="h-[calc(100%-60px)] max-w-full object-contain" :src="products.image" alt="">
                    <p class="text-[#282F7A] text-xl font-bold p-4">₱{{ (products.price * 10).toFixed(2)}}</p>
                </div>
            </NuxtLink>
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