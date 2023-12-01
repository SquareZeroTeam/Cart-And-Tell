<script setup lang="ts">
    let refTemp = ref<HTMLDivElement|null>(null);
    function modalToggle(event:Event) {
        refTemp?.value?.classList.toggle('hidden');
    }
    const userObj = useUserObj().value;
    // console.log(userObj);
</script>
<template>
    <header class="shadow-sm border-b-[1px] pb-4 lg:px-40 md:px-20 sm:px-8 bg-[#282F7A]">
        <div class="flex justify-center items-center pt-4">
            <div class="border-l-2 h-14 bg-gray-500 mr-1"></div>
            <NuxtLink to="/" class="text-center text-white text-lg">
                
                <p class="text-[2.20rem]">
                    <span class="font-bold">CART</span>
                    & TELL
                </p>
                <p class="text-gray-200">
                    ECOMMERCE  SOLUTIONS
                </p>
            </NuxtLink>
        </div>
    </header>
</template>