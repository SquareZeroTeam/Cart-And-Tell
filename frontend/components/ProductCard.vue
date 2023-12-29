<script setup>
const { product } = defineProps(['product']);

</script>

<template>
    <div class="relative mt-6 mb-6">
      <div class="card hover:scale-110 cursor-pointer relative  w-[14rem]">
        <img :src="product.image" alt="product" class="thumb object-contain">
        <p class="font-bold text-sm text-gray-700 truncate mt-4 text-center">{{ product.name }}</p>
        <p class="font-bold text-xl  text-[#282F7A] mt-8 mb-6 text-center">₱{{ product.amount}}</p>
      </div>
    </div>
</template>

<style scoped>
.thumb {
  height: 100px;
  width: 100%;
  margin: 0 auto;
}

.card {
  @apply p-4 bg-white shadow-xl relative z-10;
}

</style>
