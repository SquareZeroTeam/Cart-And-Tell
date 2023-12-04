<script setup lang="ts">
  const slides = ref(Array.from({ length: 10 }, () => {
    return { bg: ' #FFFF' };
  }));
</script>

<template>
  <div class="mb-4">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="{
        320: 3,   // 3 slides per view on small screens
        768: 4,   // 4 slides per view on medium screens
        1024: 5   // 5 slides per view on large screens and above
      }"
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

      <SwiperPrev class=" text-red-500 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"/>
      
      <SwiperSlide
        v-for="(slide, any) in slides"
        :key="any"
        :style="`background-color: ${slide.bg}`"
        :class="['swiper-cards', 'rounded-sm']"
      >
        {{ any }}
      </SwiperSlide>

      <SwiperNext class="text-red-500 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"/>
    </Swiper>
  </div>
</template>

<style>
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
