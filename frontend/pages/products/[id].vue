<script setup>

const { id } = useRoute().params;
const uri = `https://fakestoreapi.com/products/${id}`;
const { data: product } = await useFetch(uri, { key: id });
</script>



<template class="bg-red">
  <Header />

    <ProductDetails :product="product"/>

    
</template>
  

  <style scoped>

  </style>
  