<script setup lang="ts">
const { id } = useRoute().params;
const API = useRuntimeConfig().public.API;
const { data: product } = await useFetch(`${API}/products/${id}`,{key:id as string});
</script>



<template class="">
  <Header />

    <ProductDetails :product="product"/>

    <Footer/>
</template>
  

  <style scoped>

  </style>
  