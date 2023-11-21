export default defineNuxtPlugin( async () => {
    const token = useCookie('token');
    const API = useRuntimeConfig().public.API;
    if (token.value === undefined) {
        // return await navigateTo('/login'); 
        console.log("No token");
    }
    // Verify token
    let isInvalidToken = null;
    const result:any = await $fetch<{
        username:string,
        id:number,
        cartCount: number,
    }>(`${API}/auth/validate`,{
        headers:{
            Authorization: `Bearer ${token.value}`,
            ContentType: 'application/json',
        },
        method: 'GET',
    }).catch(async () => {
        isInvalidToken = true;
    });
    if (isInvalidToken) {
        // return await navigateTo('/login',{ redirectCode: 301 });
        console.log("Invalid token ");
    }
    if (result) {
        const userObj = useUserObj();
        userObj.value = result;
        console.log(userObj.value.id);
    }
});

