<template>
  <NuxtLink :to="`/products/${product.id}`">
    <div class="relative">
      <div
        class="card hover:border-[#282F7A] hover:scale-105 cursor-pointer relative z-1 border-2 border-transparent"
        @mouseover="showDetails(true)"
        @mouseout="showDetails(false)"
      >
        <img :src="product.image" alt="product" class="thumb">
        <p class="text-bold text-gray-500 truncate">{{ product.title }}</p>
        <p class="text-bold text-[#b7410e] mt-8 mb-6">${{ product.price }}</p>
      </div>

      <transition name="fade">
        <div v-if="isHovered" class="absolute w-full bg-[#282F7A] text-white text-center z-20 bottom-[-30px]">
          <p>View Details</p>
        </div>
      </transition>
    </div>
  </NuxtLink>
</template>

<script setup>
const { product } = defineProps(['product']);
const isHovered = ref(false);

const showDetails = (hover) => {
  isHovered.value = hover;
};
</script>

<style scoped>
.thumb {
  height: 140px;
  width: 50%;
  margin: 0 auto;
}

.card {
  @apply p-8 bg-white shadow-xl relative z-10;
}

.fade-enter, .fade-leave-to {
  @apply opacity-0;
}
</style>
