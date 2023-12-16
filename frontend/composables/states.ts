interface UserObj {
    email:string,
    id:number,
    cartCount:number,
    loggedIn:boolean,
    isMerchant:boolean,
    merchant: {
        id:number,
        isVerified:boolean
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
            isVerified:false,
        }
    }
});