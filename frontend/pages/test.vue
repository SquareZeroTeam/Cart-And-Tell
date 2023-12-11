
<script setup>

    const API = useRuntimeConfig().public.API;
    const APILINK = `${API}/merchant/5`;
    const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnRhbmR0ZWxsQGdtYWlsLmNvbSIsImlkIjozLCJpc01lcmNoYW50Ijp0cnVlLCJtZXJjaGFudCI6eyJpZCI6OH0sImlhdCI6MTcwMjE0Mzg1NywiZXhwIjoxNzAyNzQ4NjU3fQ.dVyvU80pretyEuIUxz6bJ8AMzb9ufQE6d_RWAEX-_GE';
    
    const newMerchantName = ref('');
    
    const { data: merchant } = await useFetch(APILINK, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${ADMINTOKEN}`,
        },
    });
    
    const submitForm = async () => {
        try {
        const response = await fetch(APILINK, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ADMINTOKEN}`,
            },
            body: JSON.stringify({ name: newMerchantName.value }),
        });
    
        if (response.ok) {
            // Update the local merchant data
            merchant.value.name = newMerchantName.value;
        } else {
            console.error('Failed to update merchant name:', response.statusText);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
</script>
<template>
    <div>
        <div>
            <p>{{ merchant.name }}</p>
            <input v-model="newMerchantName" placeholder="Enter new name" />
            <button @click="submitForm">Submit</button>
        </div>
    </div>
</template>
  
  
<style scoped>
    /* Add your scoped styles if needed */
</style>
  