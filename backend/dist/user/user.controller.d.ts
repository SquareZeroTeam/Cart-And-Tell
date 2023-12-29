import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
declare enum userStatus {
    Active = "Active",
    Removed = "Removed",
    Banned = "Banned"
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string[];
    }>;
    findAll(status: userStatus): Promise<{
        merchant: {
            id: number;
            name: string;
            website: string;
            description: string;
            categoryId: number;
            proofOfAuthenticity: string;
            merchantRelationship: import(".prisma/client").$Enums.MerchantRelation;
            merchantStartValidity: Date;
            merchantEndValidity: Date;
            image: string;
            userId: number;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.merchantStatus;
        };
        id: number;
        email: string;
        password: string;
        isMerchant: boolean;
        status: import(".prisma/client").$Enums.UserStatus;
        cart: {
            id: number;
            userId: number;
            quantity: number;
            productId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            cart: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isMerchant: boolean;
        isEmailVerified: boolean;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string[];
    }>;
    remove(id: string): Promise<{
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
