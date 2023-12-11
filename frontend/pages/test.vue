<!-- <script setup lang="ts">
    const API = useRuntimeConfig().public.API;


    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE'
    const token = useCookie('token');
    const { data: products } = await useFetch<[{
        name: string,
        amount: number,
        description: string,
        image: string,
    }]>(`${API}/merchant/4/products/34`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    });
    console.log(products);
    const formData = reactive<{
        name: string,
        amount: number,
        description: string,
        image: File|null,
    }>({
        name: "",
        amount: NaN,
        description: "",
        image: null,
    });

    const { files: files1, open: open, reset: reset1, onChange: onChange } = useFileDialog({
    accept: 'image/*',
    });

    onChange((files1) => {
    formData.image = files1![0];
    });

    
    async function update() {
        const formDataCreate = new FormData();
        console.log(formData);
        formDataCreate.append('name',formData.name);
        formDataCreate.append('amount',formData.amount.toString());
        formDataCreate.append('description',formData.description);
        formDataCreate.append('image',formData.image!);
        console.log(formData);
        console.log(products);
        const token = useCookie('token');
        const data = await $fetch<{message:string}>(`${API}/merchant/4/products/34}`,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: formDataCreate
        }).catch(error => {
            console.log("ERROR");
        })

        console.log(products);
    }

    
</script>

<template>
    <div class="mt-4">
        <label class="block mb-1 font-bold text-lg" for="name">name</label>
        <input v-model="formData.name" id="name" type="text" name="name" class="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
    </div>
    <div class="mt-4">
        <label class="block mb-1 font-bold text-lg" for="name">image</label>
        <input @click="(open as any)" id="name" type="file" name="name" class="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
    </div>
    <div class="mt-4">
        <label class="block mb-1 font-bold text-lg" for="name">amount</label>
        <input v-model="formData.amount" id="description" type="text" name="name" class="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
    </div>
    <div class="mt-4">
        <label class="block mb-1 font-bold text-lg" for="name">description</label>
        <input v-model="formData.description" id="description" type="text" name="name" class="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
    </div>

    <div>
        <button @click="update" value="create" type="button" class="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition">Add Product</button>
    </div>
</template> -->
