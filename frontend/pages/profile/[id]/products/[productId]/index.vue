<script setup lang="ts">
const { id,productId } = useRoute().params;
const API = useRuntimeConfig().public.API;
const { data: product,error } = await useFetch<{image:string,name:string,description:string,amount:number}>(`${API}/merchant/${id}/products/${productId}`,{
    key:id as string,
    headers: {
        'Authorization' : `Bearer ${useCookie('token').value}`
    }
    });
if (error.value) {
    throw createError({statusCode:404,statusMessage:"Product Not Found"});
}
if(useUserObj().value.merchant!.id != +id) {
    throw createError({statusCode:403,message:"Forbidden Resource"});
}
async function Delete() {
    const modal = ref(false);
    const data= await $fetch<{message:string}>(`${API}/merchant/${id}/products/${productId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${useCookie('token').value}`
        },
    }).catch(error => {
        alert(error.data.message)
    });
    if (data) {
        await navigateTo(`/profile/${id}`);
    }
}
const modal =ref(false);
</script>
<template>
    <div class="absolute flex justify-center items-center h-[100%] w-[100%] bg-[rgba(255,255,255,0.2)] " v-if="modal" @click="() => modal = false">
           <div class="bg-white rounded-md w-[500px] shadow-md p-4 items-center flex flex-col gap-4" @click.stop>
                <h1 class="text-2xl font-black">Are you sure to delete this product?</h1>
                <button @click="Delete" class="border-2 px-4 py-2 rounded-full font-bold text-white bg-blue-600 border-blue-600 hover:bg-white hover:text-black">Confirm</button>
           </div> 
    </div>
  <Header />
  <div class="container mx-auto flex justify-center mt-2">
    <div class="hidden sm:hidden lg:flex">
        <SideBar />
    </div>
    <div class="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 mt-5rem  lg:pr-48 lg:pl-48 mb-40 border-2 pb-40 lg:mr-10">
    <div class="flex flex-col items-center ">
      <img :src="product!.image" alt="product" class=" h-64 lg:h-96 object-contain mb-4 lg:mb-0 lg:hidden" />

      <div class="lg:flex lg:items-center lg:justify-center lg:ml-8">
        <img :src="product!.image" alt="product" class="hidden lg:block w-1/2 h-96 object-contain mb-0 lg:mb-0" />

        <div class="lg:ml-16 mt-4">
          <p class="text-4xl font-bold">{{ product!.name }}</p>
          <p class="text-3xl text-[#282F7A] font-bold mb-12">₱{{ product!.amount }}</p>
          <p class="text-lg text-gray-600 leading-relaxed mb-6">{{ product!.description }}</p>

          <div class="flex items-center space-x-4">
            <NuxtLink v-if="useUserObj().value.merchant?.isVerified" :to="`${productId}/edit`">
                <button class="flex justify-center items-center bg-[#d4d5e4] bg-opacity-70 border-2 border-[#282F7A] w-36 h-12 text-[#282F7A] mr-1rem">
                <span class="material-symbols-outlined text-[#282F7A]">edit</span>
                <p class="text-md font-medium ml-2">Edit Product</p>
              </button>
            </NuxtLink>
            <button v-if="useUserObj().value.merchant?.isVerified" @click="() => {modal = true}" class="flex justify-center items-center bg-[#d4d5e4] bg-opacity-70 border-2 border-red-500 px-2    h-12 text-red-500 mr-1rem">
                <span class="material-symbols-outlined ">delete</span>
                <p class="text-md font-medium ml-2">Delete Product</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>
  