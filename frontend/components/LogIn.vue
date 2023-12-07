<script setup lang="ts">
import { reactive, watch } from 'vue';
const API = useRuntimeConfig().public.API;
const formData = reactive<{email:string, password:string}>({
  email: '',
  password: ''
});
const errorMessage = ref<string>("");
interface loginFetchData {
  message:string,
  access_token?:string
}
async function login(email:string, password:string):Promise<loginFetchData> {
  const data = await $fetch<string>(`${API}/auth/login`,{
    method:'POST',
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email,password})
  })
  .then(res => res)
  .catch(error => error.data);
  return data;
}
async function handler() {
  console.log("TEST");
  errorMessage.value = "";
  const result:loginFetchData = await login(formData.email, formData.password);
  if (result.access_token) {
    const token = useCookie('token');
    token.value = result.access_token;

    const userObj = useUserObj();
    const response:any = await $fetch<{
        email:string,
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
<<<<<<< HEAD
    const errorMSG = (result.message === "Unauthorized") ? "Provide email and Password":result.message; 
=======
    const errorMSG = (result.message === "Unauthorized") ? "Provide Email and Password":result.message; 
>>>>>>> upstream/main
    errorMessage.value = errorMSG;
  }
}
</script>

<template>
<<<<<<< HEAD
  <div class="">
    <Header/>
    <div class="container mx-auto flex justify-center items-center flex-col h-screen p-4">
=======
  <div class="container mx-auto">
    <div class="flex justify-center items-center flex-col h-screen p-4">
>>>>>>> upstream/main
      <h3 class="text-2xl font-bold text-black mb-6">Log In to <span class="text-[#282F7A]">Cart & Tell</span></h3>
      <div class="relative group mb-6 w-full md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <input
          v-model="formData.email"
          type="text"
          id="email"
          required
          class="peer w-full h-[3rem] mb-1.5 text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-[2rem]"
        />
        <label
          for="email"
          class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-[2rem] text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-8 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
        >
          Email
        </label>
      </div>
      <div class="relative group mb-6 w-full md:w-[70%] lg:w-[50%] xl:w-[40%]">
          <input
            v-model="formData.password"
            type="password"
            id="password"
            required
            class="peer w-full h-[3rem] mb-1.5 text-xl bg-gray-200 bg-opacity-20 rounded-[0.5rem] border-2 border-[#2563EB] pl-[2rem]"
          />
          <label
            for="password"
            class="transform transition-all absolute top-0 left-0 h-[3rem] flex items-center pl-[2rem] text-lg group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-6 peer-valid:h-8 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
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
        
        <div class="">
            <ul>
              <li class="mt-4 font-bold">{{ errorMessage }}</li>
            </ul>
        </div>

        <NuxtLink
        to="/signup"
        type="button"
        class="text-center flex justify-center items-center w-full md:w-[70%] lg:w-[50%] xl:w-[40%] h-[3rem] border-2 bg-[#282F7A] rounded-[0.5rem] text-white font-bold text-xl mt-0.5"
      >
        Register
        </NuxtLink>
        <p class="text-md">Want to become part of part of Cart & Tell? Register Now!</p>

      
    </div>
  </div>
</template>
