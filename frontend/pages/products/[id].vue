<script setup lang="ts">
const { id } = useRoute().params;
const API = useRuntimeConfig().public.API;
const { data: product } = await useFetch(`${API}/products/${id}`,{key:id as string});
</script>



<template class="">
  <Header />
  <div class="container mx-auto flex justify-center mt-2">
    <div class="hidden sm:hidden lg:flex">
            <SideBar />
            </div>

    <ProductDetails :product="product"/>
  </div>

</template>
  

  <style scoped>

  </style>
  