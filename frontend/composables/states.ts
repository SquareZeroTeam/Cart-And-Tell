interface UserObj {
    email:string,
    id:number,
    cartCount:number,
    loggedIn:boolean,
    isMerchant:boolean,
    merchant: {
        id:number,
    }|null
}
export const useUserObj = () => useState<UserObj>("userObj", () => {
    return {
        email:"",
        id:NaN,
        cartCount:0,
        loggedIn:false,
        isMerchant:false,
        merchant: {
            id:NaN,
        }
    }
});