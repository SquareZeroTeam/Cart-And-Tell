<script setup lang="ts">
    let refTemp = ref<HTMLDivElement|null>(null);
    function modalToggle(event:Event) {
        refTemp?.value?.classList.toggle('hidden');
    }
</script>
<template>
    <header class="shadow-sm border-b-[1px] py-3 px-6 ">
        <div class="container mx-auto flex flex-col sm:flex-row items-center">
            <NuxtLink to="/"><h1 class="text-blue-800 flex-none font-bold text-3xl mb-4 sm:mb-0">Cart & Tell</h1></NuxtLink>
            <div class="flex flex-1 w-full">
                <div class="sm:ml-8 ml-1 h-12 border-2 rounded-full flex-1 flex overflow-hidden ">
                    <select class="bg-white text-xl px-4 w-42">
                        <option value="Products" selected>
                            Products
                        </option>
                        <option value="Manufacturers">
                            Manufacturers
                        </option>
                        <option value="Suppliers">
                            Suppliers
                        </option>
                    </select>
                    <input type="text" class="flex-1 outline-none w-0 px-2 text-xl border-l-2">
                    <button class="flex justify-center items-center bg-blue-800 w-12 rounded-full text-white">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </div>
                <nav class="flex w-full sm:ml-4 justify-center items-center absolute top-[125px] left-0 sm:static sm:w-56">
                    <button @click="modalToggle" class="flex-none rounded-md border-2 h-12 w-12 flex justify-center items-center sm:hidden absolute top-[calc(-125px+0.5rem)] right-2">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                    <div ref="refTemp" class="nav-burger w-full sm:mt-0 sm:flex hidden gap-2">
                        <button class="text-xl font-bold flex-1 w-full sm:w-auto border-2 px-4 h-12 rounded-full flex justify-center items-center">
                            <span class="material-symbols-outlined">person</span>
                            Login
                        </button>
                        <button class="text-xl font-bold text-white bg-blue-800 flex-1 w-full sm:w-auto border-2 border-blue-800 px-4 h-12 rounded-full">Signup</button>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>