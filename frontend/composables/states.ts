export const useUserObj = () => useState("userObj", () => {
    return {
        username:"",
        id:NaN,
        cartCount:0,
        loggedIn:false,
    }
});