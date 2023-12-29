declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        merchant: {
            id: number;
            userId: number;
            isVerified: boolean;
        };
        cart: ({
            product: {
                id: number;
                name: string;
                amount: number;
                description: string;
                image: string;
                rating: number;
                merchantId: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            userId: number;
            quantity: number;
            productId: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        _count: {
            cart: number;
        };
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isMerchant: boolean;
        isEmailVerified: boolean;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
}
export {};
