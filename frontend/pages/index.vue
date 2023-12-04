<script setup>
    //Ping Free Render Server
    // const API = useRuntimeConfig().public.API;
    // const { pending, data: result, error } = await useFetch(`${API}`, {
    //     lazy: true
    // });
</script>
<template>
    <div clas="container">
        <Header/>
        <div class="container mx-auto flex justify-center mt-2">
            <div class="hidden sm:hidden lg:flex">
  <SideBar />
</div>


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