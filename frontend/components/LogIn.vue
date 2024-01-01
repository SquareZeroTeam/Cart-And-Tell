<script setup lang="ts">
import { reactive, watch } from "vue";
const API = useRuntimeConfig().public.API;
const formData = reactive<{ email: string; password: string }>({
  email: "",
  password: "",
});
const loading = ref(false);
const errorMessage = ref<string>("");
interface loginFetchData {
  message: string;
  access_token?: string;
}
async function login(email: string, password: string): Promise<loginFetchData> {
  const data = await $fetch<string>(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res)
    .catch((error) => error.data);
  return data;
}
async function handler() {
  loading.value = true;
  errorMessage.value = "";
  const result: loginFetchData = await login(formData.email, formData.password);
  if (result.access_token) {
    const token = useCookie("token");
    token.value = result.access_token;

    const userObj = useUserObj();
    const response: any = await $fetch<{
      email: string;
      id: number;
      cartCount: number;
    }>(`${API}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        ContentType: "application/json",
      },
      method: "GET",
    });
    if (response) {
      const userObj = useUserObj();
      console.log(response);
      userObj.value = { ...response, loggedIn: true };
    }
    await navigateTo("/");
  } else {
    const errorMSG =
      result.message === "Unauthorized"
        ? "Provide Email and Password"
        : result.message;
    errorMessage.value = errorMSG;
  }
  loading.value = false;
}
</script>
<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center flex-col h-screen p-4">
      <h3 class="text-2xl font-bold text-black mb-6">
        Log In to <span class="text-[#282F7A]">Cart & Tell</span>
      </h3>
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
        <p
          class="text-sm text-[#282F7A] font-semibold cursor-pointer mb-1.5 mt-0.25"
        >
          Forgot Password?
        </p>
      </div>
      <button
        v-if="loading"
        class="w-full md:w-[70%] lg:w-[50%] xl:w-[40%] h-[3rem] border-2 bg-[#282F7A] rounded-[0.5rem] text-white font-bold text-xl mt-0.5"
      >
        <svg
          aria-hidden="true"
          role="status"
          class="inline mr-3 w-4 h-4 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          ></path>
        </svg>
        Log In...
      </button>
      <button
        v-else
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

      <p class="text-md">
        Want to become part of part of Cart & Tell?
        <NuxtLink to="/signup" class="font-bold text-[#282F7A]">
          Register Now!</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
