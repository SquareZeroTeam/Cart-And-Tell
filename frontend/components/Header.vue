<script setup lang="ts">
    let refTemp = ref<HTMLDivElement|null>(null);
    function modalToggle(event:Event) {
        refTemp?.value?.classList.toggle('hidden');
    }
    const userObj = useUserObj().value;
    // console.log(userObj);
</script>
<template>
    <header class="shadow-sm border-b-[1px] pb-4 lg:px-40 md:px-20 sm:px-8 bg-[#2563EB]">
        <div class="container mx-auto pb-6 pt-2 text-white text-md hidden sm:block lg:block">
            <div class="flex items-center">
                <div v-if="!userObj.loggedIn">
                    <NuxtLink to="/login">
                        <button>
                            <span>
                                Merchant Center
                                <span class="m-3 text-gray-200">|</span>
                            </span>
                        </button>
                    </NuxtLink>
                    <NuxtLink to="/signup">
                        <button>
                            <span>
                                Start Selling
                            </span>
                            <span class="m-3 text-gray-200">|</span>
                        </button>
                    </NuxtLink>
                </div>
                <div v-else>
                    <NuxtLink to="/merchant/merchantcenter">
                        <button>
                            <span>
                                Merchant Center
                                <span class="m-3 text-gray-200">|</span>
                            </span>
                        </button>
                    </NuxtLink>
                    <NuxtLink to="/merchant/merchantcenter">
                        <button>
                            <span>
                                Start Selling
                            </span>
                            <span class="m-3 text-gray-200">|</span>
                        </button>
                    </NuxtLink>
                </div>
                
                
                <span>Follow us on</span>
                <button class="ml-2 w-6 h-6">
                    <a href="https://facebook.com" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/facebook--v1.png" alt="Facebook">
                    </a>
                </button>
                <button class="ml-1 w-6 h-6">
                    <a href="http://twitter.com" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter">
                    </a>
                </button>
                <button class="ml-1 w-6 h-6">
                    <a href="http://instagram.com" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/linkedin--v1.png" alt="Instagram">
                    </a>
                </button>
            </div>  
        </div>
        <div class="container mx-auto flex flex-col sm:flex-row items-center ">
            <NuxtLink to="/"><h1 class="text-white flex-none font-bold text-3xl mb-4 sm:mb-0">Cart & Tell</h1></NuxtLink>
            <div class="flex flex-1 w-full">
                <div class="sm:ml-8 ml-1 h-12 border-2 rounded-full flex-1 flex overflow-hidden ">
                    <select class="bg-white text-xl px-4 w-36">
                        <option value="Products" selected>
                            Products
                        </option>
                        <option value="Merchants">
                            Merchants
                        </option>
                    </select>
                    <input type="text" class="flex-1 outline-none w-0 px-2 text-xl border-l-2">
                    <NuxtLink to="/products">
                        <button class="flex-none bg-[#2563EB] text-white px-4 h-full flex justify-center items-center">
                            <span class="material-symbols-outlined">search</span>
                        </button>
                    </NuxtLink>
                </div>
                <nav class="flex w-full sm:ml-4 justify-center items-center absolute top-[125px] left-0 sm:static sm:w-56">
                    <div class="w-full" v-if="!userObj.loggedIn">
                        <button @click="modalToggle" class="text-red flex-none bg-white rounded-md h-10 w-10 flex justify-center items-center sm:hidden absolute top-[calc(-125px+0.5rem)] right-2">
                        <span class="material-symbols-outlined">menu</span>
                        </button>
                        <div ref="refTemp" class="nav-burger w-full sm:mt-0 sm:flex hidden gap-2">
                            <NuxtLink to="/login">
                                <button class="mb-2 border-[#2563EB] text-xl font-bold flex-1 w-full sm:w-auto border-2 px-4 h-12 rounded-full flex justify-center items-center">
                                <span class="material-symbols-outlined">person</span>
                                Login
                            </button>
                            </NuxtLink>
                            
                            <NuxtLink to="/signup">
                                <button class="text-xl font-bold text-white bg-[#282F7A] flex-1 w-full sm:w-auto px-4 h-12 rounded-full">Signup</button>
                            </NuxtLink> 
                        </div>
                    </div>
                    <div class="w-full h-20 flex justify-evenly items-center gap-4 fixed sm:h-0 sm:static left-0 bottom-0 bg-white" v-else>
                        <div class="relative top-2 flex flex-col justify-center items-center sm:hidden ">
                            <span class="material-symbols-outlined text-4xl ">home</span>
                            <p class="block sm:hidden">Home</p>
                        </div> 
                        <NuxtLink to="/user/cart">
                            <div class="relative top-2 flex flex-col justify-center items-c text-black sm:text-white ">
                                <span class="material-symbols-outlined text-4xl">shopping_cart</span>
                                <p class="block sm:hidden">Cart</p>
                                <p class="absolute top-[-8px] left-5 bg-[#2563EB] sm:bg-white h-6 w-6 text-center rounded-full text-white sm:text-[#2563EB] font-semibold">{{ userObj.cartCount }}</p>
                            </div>
                        </NuxtLink>
                        <div class="relative sm:flex items-center flex flex-col sm:flex-row sm:top-1 justify-center items-c text-black sm:text-white">
                            <span class="material-symbols-outlined text-4xl sm:text-5xl">account_circle</span>
                            <p class="text-xl font-medium hidden sm:block">{{ userObj.username }}</p>
                            <p class="block sm:hidden">Account</p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>