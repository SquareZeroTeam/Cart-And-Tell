interface userObj {
    id: number;
    email: string;
    cart: Array<any>;
    cartCount: number;
    isMerchant: boolean;
    merchant: {
        id: number;
        userId: number;
        isVerified: boolean;
    };
    status: string;
}
export declare class JwtService {
    decode(token: string): userObj;
}
export {};
