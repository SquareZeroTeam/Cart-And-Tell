<script setup lang="ts">
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import { useDevicesList, useUserMedia } from "@vueuse/core";
const userObj = useUserObj().value;
const API = useRuntimeConfig().public.API;
const { id } = useRoute().params;
const videoGrid = ref<HTMLVideoElement>();
const peerActive = ref(false);
// @ts-ignore
const peer = new Peer(undefined, {
  config: {
    iceServers: [
      { urls: "stun:stun.relay.metered.ca:80" },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "b128fb44b291e1fe3d9baa0d",
        credential: "TuZQEwTNlVaaOeHG",
      },
      {
        urls: "turn:a.relay.metered.ca:80?transport=tcp",
        username: "b128fb44b291e1fe3d9baa0d",
        credential: "TuZQEwTNlVaaOeHG",
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: "b128fb44b291e1fe3d9baa0d",
        credential: "TuZQEwTNlVaaOeHG",
      },
      // {"urls":"turn:a.relay.metered.ca:443?transport=tcp","username":"b128fb44b291e1fe3d9baa0d","credential":"TuZQEwTNlVaaOeHG"}
    ],
  },
});
const socket = io(`${API}/messages`, {
  extraHeaders: {
    Authorization: `Bearer ${useCookie("token").value}`,
  },
});

const { data: livestream, error } = await useFetch<{
  roomId: string;
  merchant: {
    id: number;
    name: string;
    image: string;
    category: { name: string };
  };
}>(`${API}/livestreams/${id}`, {
  key: id.toString(),
});
if (error.value) {
  await navigateTo("/");
  throw createError({ statusCode: 404, message: "Livestream not found" });
}
const messagesArray = ref<
  Array<{
    id: number;
    text: string;
    user: { id: number; email: string };
  }>
>([]);
const message = ref("");
const expand = ref<boolean>(false);

let mediaStream = ref<MediaStream | null>(null);
if (
  userObj.isMerchant &&
  userObj.merchant?.id == livestream.value?.merchant.id
) {
  var { videoInputs: cameras, audioInputs: microphones } = useDevicesList({
    requestPermissions: true,
  });
  const currentCamera = computed(() => cameras.value[0]?.deviceId);
  const currentMicrophone = computed(() => microphones.value[0]?.deviceId);
  const { stream, start, stop, restart, enabled } = useUserMedia({
    constraints: {
      video: { deviceId: currentCamera.value as any },
      audio: { deviceId: currentMicrophone.value as any },
    },
  });

  start();
  watchEffect(() => {
    mediaStream.value = stream.value as MediaStream;
    if (
      videoGrid.value &&
      stream.value &&
      userObj.isMerchant &&
      livestream.value?.merchant.id == userObj.merchant!.id
    ) {
      videoGrid.value!.srcObject = stream.value || null;
      videoGrid.value.muted = true;
      peer.on("open", (streamerId) => {
        peerActive.value = true;
        socket.emit("join", { userId: userObj.id, roomId: id }, () => {});
        socket.emit("findAllMessages", { roomId: id }, (messages: any) => {
          messagesArray.value = messages;
          socket.on("message", (message: any) => {
            messagesArray.value.push(message);
          });
        });
        socket.emit(
          "liveStreamViewers",
          { roomId: id },
          (
            viewers: [
              {
                id: number;
                socketId: string;
                peerId: string;
                liveStreamId: string;
              }
            ]
          ) => {
            viewers.forEach((viewer) => {
              peer.call(viewer.peerId, mediaStream.value as MediaStream);
            });
          }
        );
        socket.on(
          "connectlivestream",
          (data: { clientId: string; roomId: string }) => {
            peer.call(data.clientId, mediaStream.value as MediaStream);
          }
        );
        socket.on("endLivestreamDisconnect", async () => {
          stop();
          socket.disconnect();
          peer.disconnect();
          videoGrid.value!.srcObject = null;
          await navigateTo("/");
        });
      });
    }
  });
}

onBeforeMount(() => {
  if (!(livestream.value?.merchant.id == userObj.merchant!.id)) {
    peer.on("open", (clientId) => {
      socket.emit("join", { userId: userObj.id, roomId: id }, () => {});
      socket.emit("joinLivestream", { roomId: id, clientId });
      socket.emit("findAllMessages", { roomId: id }, (messages: any) => {
        messagesArray.value = messages;
        socket.on("message", (message: any) => {
          messagesArray.value.push(message);
        });
      });
      socket.on("endLivestreamDisconnect", async () => {
        stop();
        socket.disconnect();
        peer.disconnect();
        videoGrid.value!.srcObject = null;
        await navigateTo("/");
      });
    });
    peer.on("call", (call) => {
      call.answer();
      call.on("stream", (stream) => {
        if (!stream) {
          call.close();
        }
        if (videoGrid.value) {
          videoGrid.value!.srcObject = stream;
          videoGrid.value!.play();
        }
      });
      call.on("close", () => {
        if (videoGrid.value) {
          videoGrid.value!.srcObject = null;
        }
      });
    });
  }
});
onBeforeRouteLeave(() => {
  socket.disconnect();
  peer.disconnect();
  peer.destroy();
  if (mediaStream.value) {
    mediaStream.value!.getTracks().forEach((track: any) => {
      track.stop();
    });
  }
  if (videoGrid.value) {
    videoGrid.value!.srcObject = null;
  }
});

function createMessage() {
  socket.emit(
    "createMessage",
    {
      text: message.value,
      userId: userObj.id,
      liveStreamRoomId: id,
    },
    () => {}
  );
  message.value = "";
}
function Delete() {
  if (peerActive.value) {
    peerActive.value = false;
    socket.emit("endLivestream", { roomId: id }, () => {});
  }
}
</script>
<template>
  <div clas="container">
    <Header />
    <div class="container mx-auto flex justify-center mt-2">
      <div class="hidden sm:hidden xl:flex">
        <SideBar />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div class="bg-[#282F7A]">
          <p class="text-white m-4 font-bold">Live Stream Session</p>
        </div>
        <div class="h-[750px] border-2 rounded-xl flex p-4 bg-[#F2F4F7]">
          <div class="w-full h-full flex flex-col mr-4 gap-4">
            <div class="flex justify-start items-center bg-white rounded-lg">
              <img :src="livestream?.merchant.image" class="h-16" alt="" />
              <div class="p-4">
                <p class="font-bold">{{ livestream?.merchant.name }}</p>
                <p>{{ livestream?.merchant.category.name }}</p>
              </div>
            </div>
            <div
              class="w-full h-full border-2 rounded-xl overflow-hidden border-transparent"
            >
              <div class="bg-white h-full w-full" id="videoGrid">
                <video
                  ref="videoGrid"
                  autoplay
                  class="h-full w-full object-cover"
                />
              </div>
              <!-- <img src="/samplelivestream.jpg" class="h-full w-full object-cover" alt=""> -->
            </div>
            <div class="h-[100px] rounded-full flex justify-center">
              <button
                @click="Delete"
                v-if="
                  userObj.isMerchant &&
                  userObj.merchant?.id == livestream?.merchant.id &&
                  peerActive
                "
                class="bg-red-600 text-white px-4 py-2 rounded-full h-16 w-48 font-bold border-2 border-red-600 hover:bg-white hover:text-red-600"
                type="button"
              >
                End Session
              </button>
            </div>
          </div>
          <div
            class="w-[500px] border-2 h-full rounded-xl bg-white border-transparent flex flex-col"
          >
            <p class="p-4 font-bold text-2xl">Chat</p>
            <!-- <div  v-if="!expand" class="m-4 rounded-lg flex flex-col border-2 p-4">
                            <div @click="expand = true" class="flex justify-between items-center">
                                <p class="font-bold text-lg">Vans Shoes</p>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </div>
                        </div>
                        <div v-else class="m-4 rounded-lg flex flex-col border-2 p-4">
                            <div @click="expand = false" class="flex justify-end items-center">
                                <span class="material-symbols-outlined">expand_more</span>
                            </div>
                            <img src="/sample.jpg" class="h-[185px] object-contain" alt="">
                            <p class="font-bold text-lg">Vans Shoes</p>
                        </div> -->

            <div class="p-4 mt-4 overflow-y-scroll h-full">
              <div v-for="message in messagesArray">
                <div v-if="message.user.id != userObj.id" class="flex flex-col">
                  <p class="font-bold">{{ message.user.email }}</p>
                  <div class="flex">
                    <p class="px-4 rounded-full py-2 bg-[#F2F4F7]">
                      {{ message.text }}
                    </p>
                  </div>
                </div>
                <div v-else class="flex flex-col items-end">
                  <p class="font-bold">{{ message.user.email }}</p>
                  <div class="flex">
                    <p class="px-4 rounded-full py-2 bg-blue-400 text-white">
                      {{ message.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-[75px] border-t-2 p-4 shrink-0">
              <p v-if="!userObj.id">Please Log in to post message</p>
              <p v-else-if="!userObj.isEmailVerified">
                Please Verify your email to post a message
              </p>
              <input
                @keyup.enter="createMessage"
                v-else
                v-model="message"
                type="text"
                class="h-full w-full outline-none font-medium"
                placeholder="Write your message..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
