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
const prevImage = ref("");
    async function create() {
            let isError = false;
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
                alert(error.data.message);
                isError = true
                return;
            })
            if (!isError) {
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
            <div class="flex items-center justify-center w-full relative mt-8">
                <img :src="prevImage" alt="" class="absolute w-48">
                <label class="flex flex-col  w-64 h-64 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7 h-[100vh]">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 mt-">
                            Select a photo</p>
                    </div>
                    <input @click="(open as any)" type="file" class="opacity-0" />
                </label>
            </div>
        </div>
        <div class="lg:ml-16 mt-16">
          <!-- <p class="text-4xl font-bold">{{ product.name }}</p> -->
          <textarea v-model="formData.name" class="border-2 text-4xl font-bold w-full" placeholder="Product Name"></textarea>
          <input v-model="formData.amount" type="number" class="text-xl font-semibold text-gray-700 mb-6 mt-6 border-2" placeholder="Product Amount">
          <!-- <p class="text-3xl text-[#282F7A] font-bold mb-12">₱{{ product.amount }}</p> -->
          <textarea v-model="formData.description" class="border-2 w-full text-lg text-gray-600 leading-relaxed mb-6" placeholder="Product Description"></textarea>
          <!-- <p class="text-lg text-gray-600 leading-relaxed mb-6">{{ product.description }}</p> -->

          <div class="flex items-center space-x-4">
            <button class="flex justify-center items-center bg-[#282F7A] border-2 border-[#282F7A] w-36 h-12 text-white">
              <p @click="create" class="text-md font-bold rounded-full">Create Product</p>
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
  