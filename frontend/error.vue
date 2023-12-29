<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="h-screen w-screen flex mt-[200px] items-center flex-col bg-white">
    <img src="/error.svg" alt="" class="h-[250px]">
    <h2 class="text-7xl font-bold">{{ error!.statusCode }}</h2>
    <h3 class="text-4xl">{{ error!.message }}</h3>
    <button class="border-2 rounded-full px-4 py-2 mt-4 font-bold" @click="handleError">Return Home</button>
  </div>
</template>