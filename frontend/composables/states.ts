export const useUserObj = () => useState("userObj", () => {
    return {
        email:"",
        id:NaN,
        cartCount:0,
        loggedIn:false,
        isMerchant:false,
    }
});