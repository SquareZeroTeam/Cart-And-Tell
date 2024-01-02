<script setup lang="ts">
const API = useRuntimeConfig().public.API;
const {data} = await useFetch<[{id:number,image:string}]>(`${API}/merchant/verified`, {
  lazy:true
})
</script>

<template>
  <div class="hidden lg:block mb-4">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="4"
      :spaceBetween="30"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :creative-effect="{
        prev: {
          translate: ['100%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperPrev
        class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
      />

      <SwiperSlide
        v-for="merchant in data"
        :key="merchant.id"
        :class="[
          'swiper-cards',
          'rounded-sm',
          'border-t-2',
          'border-b-2',
          'border-[#282F7A]',
        ]"
      >
      <NuxtLink :to="`/merchants/${merchant.id}`">
        <img class="object-cover w-full h-full" :src="merchant.image"/>
      </NuxtLink>
      </SwiperSlide>

      <SwiperNext
        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
      />
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
  font-family: "Roboto", sans-serif;
}
.swiper-wrapper {
  margin-left: 5rem;
  width: 200px;
}
.swiper-cards {
  height: 150px;
}
</style>
