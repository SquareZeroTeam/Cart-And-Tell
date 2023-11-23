<script setup>

const { id } = useRoute().params;
const uri = `https://fakestoreapi.com/products/${id}`;
const { data: product } = await useFetch(uri, { key: id });
</script>



<template class="">
  <Header />

    <ProductDetails :product="product"/>

    <Footer/>
</template>
  

  <style scoped>

  </style>
  