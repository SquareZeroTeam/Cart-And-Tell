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
        <div class="container mx-auto flex justify-center mt-1">
            <SideBar/>
            <Home/>
        </div>
        
        <!-- <HomeHero/>
        <Categories/>
        <ProductFeatures/>
        <JustForYou/> -->
        <!-- <Loading v-if="pending"/> -->
    </div>
</template>


<style scoped>

</style>