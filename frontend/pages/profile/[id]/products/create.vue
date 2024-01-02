<script setup lang="ts">
    const { id } = useRoute().params;
    const API = useRuntimeConfig().public.API;
    import { useFileDialog } from '@vueuse/core'
    const formData = reactive<{name:string,image:File|null,merchantId:number,description:string,amount:number}>({
        name: "",
        image: null,
        merchantId:useUserObj().value.merchant!.id,
        description:"",
        amount:NaN,
    })
    const { files, open, reset, onChange } = useFileDialog({
    accept: 'image/*', // Set to accept only image files
    })

    onChange((files) => {
        formData.image = files![0]
    })
    watch(() => formData.image, (val) => {
        if (val) {
            const reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onload = () => {
                prevImage.value = reader.result as string;
            }
        }
    })

    const isLoading = ref(false);
const prevImage = ref("");
    async function create() {
            if (isLoading.value) {
                return;}
            isLoading.value = true;
            const formDataCreate = new FormData();
            formDataCreate.append('name',formData.name);
            formDataCreate.append('image',formData.image!);
            // formDataCreate.append('merchantId',formData.merchantId.toString());
            formDataCreate.append('description',formData.description);
            formDataCreate.append('amount',formData.amount.toString());

            const token = useCookie('token');
            const data = await $fetch<{message:string,id:number}>(`${API}/merchant/${formData.merchantId}/products`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.value}`
                },
                body: formDataCreate
            }).catch(error => {
                isLoading.value = false;
                alert(error.data.message);
                return;
            })
            if (data) {
                await navigateTo(`/profile/${formData.merchantId}/products/${data!.id}`);
            }
        }
</script>



<template class="">
  <Header />
  <div class="container mx-auto flex justify-center mt-2">
    <div class="hidden sm:hidden lg:flex">
        <SideBar />
    </div>
    <div class="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 mt-5rem  lg:pr-48 lg:pl-48 mb-40 border-2 pb-40 lg:mr-10">
    <div class="flex flex-col items-center ">
      <div class="lg:flex lg:items-center lg:justify-center lg:ml-8">
        <!-- <img :src="product.image" alt="product" class="hidden lg:block w-1/2 h-96 object-contain mb-0 lg:mb-0" /> -->
        <div class="flex justify-center items-center">
            <div class="flex items-center justify-center w-full relative">
                <img :src="prevImage" alt="" class="absolute w-48">
                <label class="flex flex-col  w-48 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo</p>
                    </div>
                    <input @click="(open as any)" type="file" class="opacity-0" />
                </label>
            </div>
        </div>
        <div class="lg:ml-16 mt-4">
          <!-- <p class="text-4xl font-bold">{{ product.name }}</p> -->
          <textarea v-model="formData.name" class="border-2 text-4xl font-bold w-full" placeholder="Product Name"></textarea>
          <input v-model="formData.amount" type="number" class="text-xl font-semibold text-gray-700 mb-6 border-2" placeholder="Product Amount">
          <!-- <p class="text-3xl text-[#282F7A] font-bold mb-12">₱{{ product.amount }}</p> -->
          <textarea v-model="formData.description" class="border-2 w-full text-lg text-gray-600 leading-relaxed mb-6" placeholder="Product Description"></textarea>
          <!-- <p class="text-lg text-gray-600 leading-relaxed mb-6">{{ product.description }}</p> -->

          <div class="flex items-center space-x-4">
            <button v-if="!isLoading" @click="create" class="flex justify-center items-center bg-[#282F7A] border-2 border-[#282F7A] w-36 h-12 text-white">
              <p class="text-md font-bold rounded-full">Create Product</p>
            </button>
            <button v-else class="flex justify-center items-center bg-[#282F7A] border-2 border-[#282F7A] px-4 h-12 text-white">
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
              <p class="text-md font-bold rounded-full">Create Product...</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>
  

  <style scoped>

  </style>
  