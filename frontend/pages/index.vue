<script setup>
    //Ping Free Render Server
    const API = useRuntimeConfig().public.API;
    const {data,pending} = await useLazyFetch(`${API}`);
</script>
<template>
    <div>
        <Header/>
        <HomeHero/>
        <Categories/>
        <ProductFeatures/>
        <JustForYou/>
        <Loading v-if="pending"/>
    </div>
</template>


<style scoped>

</style>