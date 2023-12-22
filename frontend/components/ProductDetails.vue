<script setup>

//I dont know if create ba object or nu hahah (e add yata sa user's cart schema?)
const quantity = ref(1);
const { id } = useRoute().params;
const increment = () => {
  quantity.value += 1;
};

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};
const userObj = useUserObj().value; 
async function addToCart() {
  const API = useRuntimeConfig().public.API;
  if(!userObj.loggedIn) {
    await navigateTo('/login');
  }
  const data = await $fetch(`${API}/user/${userObj.id}/cart`,{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${useCookie('token').value}`
    },
    body: JSON.stringify({
        products:[id],
        quantity:quantity.value
      })
    })
    .catch(error => {
    throw createError({statusCode:error.statusCode, message:error.message});
  })
  console.log(data);
  await navigateTo('/user/cart');
}
async function buyNow() {
  const API = useRuntimeConfig().public.API;
  if(!userObj.loggedIn) {
    await navigateTo('/login');
  }
  const paymentgatwaylink = await $fetch(`${API}/paymongo/buynow`,{
    method:'POST',
    body: JSON.stringify({
      data:[id]
    })
  })
  await navigateTo(paymentgatwaylink.checkoutLink,{external:true});
}
const { product } = defineProps(['product']);
</script>


<template>
  <div class="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 mt-5rem  lg:pr-48 lg:pl-48 mb-40 border-2 pb-40 lg:mr-10">
    <div class="flex flex-col items-center ">
      <img :src="product.image" alt="product" class=" h-64 lg:h-96 object-contain mb-4 lg:mb-0 lg:hidden" />

      <div class="lg:flex lg:items-center lg:justify-center lg:ml-8">
        <img :src="product.image" alt="product" class="hidden lg:block w-1/2 h-96 object-contain mb-0 lg:mb-0" />

        <div class="lg:ml-16 mt-4">
          <p class="text-4xl font-bold">{{ product.name }}</p>
          <p class="text-xl font-semibold text-gray-700 mb-6">{{ product.category }}</p>
          <p class="text-3xl text-[#282F7A] font-bold mb-12">₱{{ product.amount }}</p>
          <p class="text-lg text-gray-600 leading-relaxed mb-6">{{ product.description }}</p>

          <div class="flex items-center mb-8 lg:mt-40">
            <p class="mr-4 text-lg font-medium">Quantity</p>
            <button @click="decrement" class="w-8 h-8 bg-white border-gray-300 border flex items-center justify-center">
              <span class="text-lg">-</span>
            </button>
            <input
              v-model="quantity" 
              type="text"
              class="w-12 h-8 text-center border-t border-b border-gray-300"
            />
            <button @click="increment" class="w-8 h-8 bg-white border-gray-300 border flex items-center justify-center">
              <span class="text-lg">+</span>
            </button>
          </div>

          <div class="flex items-center space-x-4">
              <button @click="addToCart" class="flex justify-center items-center bg-[#d4d5e4] bg-opacity-70 border-2 border-[#282F7A] w-36 h-12 text-[#282F7A] mr-1rem">
              <span class="material-symbols-outlined text-[#282F7A]">add_shopping_cart</span>
              <p @click="addToCart" class="text-md font-medium ml-2">Add to Cart</p>
            </button>
            <button class="flex justify-center items-center bg-[#282F7A] border-2 border-[#282F7A] w-36 h-12 text-white">
              <p @click="buyNow" class="text-md font-normal">Buy Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

