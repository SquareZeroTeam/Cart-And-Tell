
<script setup lang="ts">
 const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    const {data:merchant} = useFetch<any>(`${API}/merchant/${id}`);

    const { data: products } = await useFetch(`${API}/products/`);
</script>

<template>
    <div>
        <div v-for="p in products" :key="p.id">
            <ProductCard :product="p" />
        </div>
          
    </div>
</template>


<style lang="scss" scoped>

</style>