<script setup lang="ts">
const API = useRuntimeConfig().public.API;
const { data, pending, error } = await useFetch<{ html: string }>(
  `${API}/cms/ContactUs`,
  {
    lazy: true,
  }
);
</script>
<template>
  <div clas="container">
    <Header />
    <div class="container mx-auto flex justify-center mt-2">
      <div class="hidden sm:hidden lg:flex">
        <SideBar />
      </div>
      <div class="flex flex-col gap-4 w-full mr-20">
        <div class="bg-[#282F7A]">
          <p class="text-white m-4">Contact Us</p>
        </div>
        <div
          class="w-full h-full animate-pulse bg-gray-300 p-4 rounded-lg"
          v-if="pending"
        >
          <div class="bg-gray-400 h-12 rounded-full mb-4 w-[50%]"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[80%]"></div>

          <div class="bg-transparent h-36 rounded-full mb-4 w-[70%]"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[70%] mx-auto"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[70%] mx-auto"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[70%] mx-auto"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[70%] mx-auto"></div>
          <div class="bg-transparent h-12 rounded-full mb-4 w-[70%]"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[70%] ml-auto"></div>
          <div class="bg-gray-400 h-6 rounded-full mb-4 w-[60%]"></div>
        </div>
        <div v-if="!error" v-html="data!.html"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
