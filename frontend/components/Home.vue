<script setup>
const API = useRuntimeConfig().public.API;
const { data: categories } = await useFetch(`${API}/category`, {
  lazy: true,
});
const {data:cartAndTellMerchant,pending} = await useFetch(`${API}/merchant/cartandtell`, {
  lazy: true,
});
console.log(cartAndTellMerchant.value)
</script>
<template>
  <div class="w-full bg-white lg:mr-12">
    <div class="flex flex-col gap-4">
      <div class="bg-[#282F7A] flex">
        <p
          class="text-white ml-6 text-xl absolute mt-2 hidden sm:block font-bold"
        >
          Introduction
        </p>
        <div class="mx-auto">
          <img class="w-96 h-auto" src="/intro.jpg" alt="Introduction Image" />
        </div>
      </div>
      <div class="bg-[#282F7A]">
        <div class="flex justify-center">
          <p class="text-white m-2 text-2xl font-bold">
            {{ categories ? Object.keys(categories).length : "" }} Categories
          </p>
        </div>
        <div
          class="min-h-[320px] grid grid-cols-auto-fit gap-4 max-w-[750px] mx-auto p-4"
        >
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/merchants?category=${encodeURIComponent(category.name)}`"
          >
            <button class="">
              <img
                class="bg-white h-20 w-20 rounded-lg hover:h-24 hover:w-24 hover:bg-blend-luminosity transition-all duration-150 ease-in-out"
                :src="category.icon"
                alt=""
              />
              <p class="hidden text-white font-bold text-center w-24 py-4">
                {{ category.name }}
              </p>
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="bg-[#282F7A] flex flex-col justify-center">
        <p class="text-white mt-2 text-2xl text-center font-bold">
          Partner Merchants
        </p>
        <div class="m-4">
          <SlidePartnerMerchant />
        </div>
      </div>
      <div class="bg-[#282F7A] mb-24 px-4">
        <div class="flex justify-center">
          <p class="text-white m-2 text-2xl font-bold">
            Cart & Tell Market Place
          </p>
        </div>
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
            :class="['w-full', 'h-[150px]','mb-4']"
          >
            <SwiperSlide v-if="!pending" v-for="product in cartAndTellMerchant.products" :key="product.id" :class="['mx-4','h-[10px]']">
              <NuxtLink :to="`/products/${product.id}`">
                <img class="object-cover w-full h-full" :src="product.image"/>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
          <!-- <div class="bg-white h-32 w-64"></div>
          <div class="bg-white h-32 w-64"></div>
          <div class="bg-white h-32 w-64"></div>
          <div class="bg-white h-32 w-64"></div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 640px) {
  .hidden {
    display: block;
  }
}
button:hover > .hidden {
  display: block;
}
/* .swiper {
  width: 100%;
  height: 100%;
  gap:4px;
} */

</style>
