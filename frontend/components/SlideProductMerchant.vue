<script setup lang="ts">
    const API = useRuntimeConfig().public.API;
    const {id} = useRoute().params;
    defineProps({
      products: {
        type: Array<{id:number}> ,
        required: true,
      },
    })
</script>

<template><!--  d nako mabuhat nga responsive sya slides per view -->
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
      
      <SwiperSlide v-for="p in products">
        <div class="">
          <NuxtLink :to="`${id}/products/${p.id}`">
            <ProductCard :product="p" />
          </NuxtLink>
        </div>
          
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
      
      <SwiperSlide v-for="p in products">
        <div class="">
          <ProductCard :product="p" />
        </div>
          
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
      
      <SwiperSlide v-for="p in products">
        <div class=""> 
          <ProductCard :product="p" />
        </div>
          
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

    width: 100vh;
  }
  .swiper-cards {
    height: 150px;
  }
</style>
