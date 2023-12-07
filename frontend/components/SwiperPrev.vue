<script setup lang="ts">
const swiper = useSwiper()
</script>

<template>
    <div class="flex justify-center items-center h-full bg-[#282F7A] pl-2 pr-4">
        <button class="bg-white rounded-full flex items-center justify-center" @click="swiper.slidePrev()"><span class="material-symbols-outlined text-[4rem] text-[#282F7A]">
navigate_before
</span></button>
    </div>
    
</template>


<style scoped>

</style>