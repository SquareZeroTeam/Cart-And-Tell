<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
    <div class="flex justify-center items-center h-40 bg-[#282F7A] pl-4 pr-2">
        <button class="bg-white rounded-full flex items-center justify-center" @click="swiper.slideNext()"><span class="material-symbols-outlined text-[4rem] text-[#282F7A]">
navigate_next
</span></button>
    </div>
    
    
</template>


<style scoped>

</style>