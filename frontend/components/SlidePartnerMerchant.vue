<script setup lang="ts">
  const slides = ref(Array.from({ length: 9 }, (_, index) => index + 1));
</script>

<template>
  <div class="hidden lg:block mb-4">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="5"
      :spaceBetween="30"
      :loop="true"
      :effect="''"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true
      }"
      :creative-effect="{
        prev: {
          translate: ['100%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class=""
    >

      <SwiperPrev class="  absolute left-0 top-1/2 transform -translate-y-1/2 z-10"/>
      
      <SwiperSlide
        v-for="index in slides"
        :key="index"
        :class="['swiper-cards', 'rounded-sm', 'border-t-2', 'border-b-2', 'border-[#282F7A]']"
      >

        <img :src="`/Partner/prodmerchant${index}.png`" alt="">

      </SwiperSlide>

      <SwiperNext class=" absolute right-0 top-1/2 transform -translate-y-1/2 z-10"/>
    </Swiper>
  </div>
  <div class="hidden md:block lg:hidden mb-4">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="3"
      :spaceBetween="30"
      :loop="true"
      :effect="''"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true
      }"
      :creative-effect="{
        prev: {
          translate: ['100%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class=""
    >

      <SwiperPrev class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"/>
      
      <SwiperSlide
        v-for="index in slides"
        :key="index"
        :class="['swiper-cards', 'rounded-sm', 'border-t-2', 'border-b-2', 'border-[#282F7A]']"
      >

        <img :src="`/Partner/prodmerchant${index}.png`" alt="">

      </SwiperSlide>

      <SwiperNext class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"/>
    </Swiper>
  </div>
  <div class="block md:hidden mb-4">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :spaceBetween="30"
      :loop="true"
      :effect="''"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true
      }"
      :creative-effect="{
        prev: {
          translate: ['100%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class=""
    >

      <SwiperPrev class=" absolute left-0 top-1/2 transform -translate-y-1/2 z-10"/>
      
      <SwiperSlide
        v-for="index in slides"
        :key="index"
        :class="['swiper-cards', 'rounded-sm', 'border-t-2', 'border-b-2', 'border-[#282F7A]']"
      >

        <img :src="`/Partner/prodmerchant${index}.png`" alt="">

      </SwiperSlide>

      <SwiperNext class=" absolute right-0 top-1/2 transform -translate-y-1/2 z-10"/>
    </Swiper>
  </div>
</template>

<style>
  
  .element.style {
    width: 600px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }
  .swiper-wrapper {
    margin-left: 5rem;
    width: 200px;
  }
  .swiper-cards {
    height: 150px;
  }
</style>
