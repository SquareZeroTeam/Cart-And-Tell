<script setup lang="ts">
const API = useRuntimeConfig().public.API;
import { io } from "socket.io-client";
const userObj = useUserObj().value;
const { data: liveStreams } = await useFetch<
  [
    {
      roomId: string;
      merchantId: number;
      merchant: { name: string; image: string };
    }
  ]
>(`${API}/livestreams`);
async function startLiveStream() {
  const data = await $fetch<{ roomId: string }>(
    `${API}/merchant/${userObj.merchant?.id}/livestream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("token").value}`,
      },
    }
  ).catch((err) => {
    alert(err.data.message);
  });
  if (data) {
    await navigateTo(`livestreams/${data.roomId}`);
  }
}
</script>
<template>
  <div clas="container">
    <Header />
    <div class="container mx-auto flex justify-center mt-2">
      <div class="hidden sm:hidden lg:flex">
        <SideBar />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div class="bg-[#282F7A]">
          <p class="text-white m-4 font-bold">
            Live Streams: {{ liveStreams?.length }}
          </p>
        </div>
        <div class="">
          <div class="flex flex-wrap gap-4">
            <button
              @click="startLiveStream"
              v-if="userObj.isMerchant && userObj.merchant?.isVerified"
              class="w-[350px] h-[400px] rounded-md shadow-md overflow-hidden flex flex-col"
              type="button"
            >
              <div
                class="flex-1 bg-[#282F7A] text-white font-bold p-4 flex justify-center items-center"
              >
                <p class="text-4xl">Start a new live stream</p>
              </div>
            </button>
            <NuxtLink
              :to="`/livestreams/${liveStream.roomId}`"
              v-for="liveStream in liveStreams"
            >
              <div
                class="w-[350px] h-[400px] rounded-md shadow-md overflow-hidden flex flex-col"
              >
                <!-- <div class="flex-1"> -->
                <img
                  :src="liveStream.merchant.image"
                  alt=""
                  class="flex-1 object-contain"
                />
                <!-- </div> -->
                <div
                  class="bg-[#282F7A] text-white font-bold p-4 flex justify-between items-center shrink-0"
                >
                  <p>{{ liveStream.merchant.name }}</p>
                  <!-- <p>Viewers: 2</p> -->
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
