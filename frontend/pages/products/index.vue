<script setup>

//Fetch the data from the fakestoreapi
const { data: products } = await useFetch('https://fakestoreapi.com/products');
</script>
<template>
  <div>
    <Header />
    <div class="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <div class="flex items-center h-3 w-32">
            <span class="material-symbols-outlined text-lg mr-2">filter_alt</span>
            <p class="text-lg">Search Filter</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="p in products" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

  




<style scoped>

</style>