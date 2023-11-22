<script setup lang="ts">
import { reactive, watch } from 'vue';
const API = useRuntimeConfig().public.API;
const formData = reactive<{username:string, password:string}>({
  username: '',
  password: ''
});
const errorMessage = ref<string>("");
interface loginFetchData {
  message:string,
  access_token?:string
}
async function login(username:string, password:string):Promise<loginFetchData> {
  const data = await $fetch<string>(`${API}/auth/login`,{
    method:'POST',
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({username,password})
  })
  .then(res => res)
  .catch(error => error.data);
  return data;
}
async function handler() {
  errorMessage.value = "";
  const result:loginFetchData = await login(formData.username, formData.password);
  if (result.access_token) {
    const token = useCookie('token');
    token.value = result.access_token;

    const userObj = useUserObj();
    const response:any = await $fetch<{
        username:string,
        id:number,
        cartCount: number,
    }>(`${API}/auth/validate`,{
        headers:{
            Authorization: `Bearer ${token.value}`,
            ContentType: 'application/json',
        },
        method: 'GET',
    })
    if (response) {
        const userObj = useUserObj();
        userObj.value = {...response,loggedIn:true};
    }
    await navigateTo('/');
  }
  else {
    const errorMSG = (result.message === "Unauthorized") ? "Provide Username and Password":result.message; 
    errorMessage.value = errorMSG;
  }
}
</script>

<template>
  <div class="container mx-auto">
    <NuxtLink to="/">
      <h1 class="text-[#282F7A] flex-none font-bold text-3xl mt-6 ml-6 absolute">Cart & Tell</h1>
    </NuxtLink>
    <div class="flex justify-center items-center flex-col h-screen p-4">
      <h3 class="text-2xl font-bold text-black mb-6">Log In to <span class="text-[#282F7A]">Cart & Tell</span></h3>
      <div class="relative group mb-6 w-full md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <input
          v-model="formData.username"
          type="text"
          id="username"
          required
          class="peer w-full h-[3rem] mb-1.5 text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-1.5"
        />
        <label
          for="username"
          class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-1.5 text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
        >
          Username
        </label>
      </div>
      <div class="relative group mb-6 w-full md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <input
          v-model="formData.password"
          type="password"
          id="password"
          required
          class="peer w-full h-[3rem] mb-1.5 text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-1.5"
        />
        <label
          for="password"
          class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-1.5 text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
        >
          Password
        </label>
        <p class="text-sm text-[#282F7A] font-semibold cursor-pointer mb-1.5 mt-0.25">Forgot Password?</p>
      </div>
      <button
        @click="handler"
        type="button"
        class="w-full md:w-[70%] lg:w-[50%] xl:w-[40%] h-[3rem] border-2 bg-[#282F7A] rounded-[0.5rem] text-white font-bold text-xl mt-0.5"
      >
        Log In
      </button>
      <p class="text-md mt-4">
        Don't have an account? <NuxtLink to="/signup" class="text-[#282F7A] font-bold cursor-pointer">Sign up</NuxtLink>
      </p>
      <div class="">
          <ul>
            <li class="mt-4 font-bold">{{ errorMessage }}</li>
          </ul>
      </div>
    </div>
  </div>
</template>
