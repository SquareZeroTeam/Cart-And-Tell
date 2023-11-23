<script setup>
    //Ping Free Render Server
    // const API = useRuntimeConfig().public.API;
    // const { pending, data: result, error } = await useFetch(`${API}`, {
    //     lazy: true
    // });
</script>
<template>
    <div>
        <Header/>
        <HomeHero/>
        <Categories/>
        <ProductFeatures/>
        <JustForYou/>
        <!-- <Loading v-if="pending"/> -->
    </div>
</template>


<style scoped>

</style>