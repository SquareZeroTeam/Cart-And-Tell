import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { NestMailerService } from 'src/nest-mailer/nest-mailer.service';
import { UserStatus } from '@prisma/client';
export declare class UserService {
    private prisma;
    private readonly nestMailer;
    constructor(prisma: PrismaService, nestMailer: NestMailerService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string[];
    }>;
    createAsMerchant(createUserDto: CreateUserDto): Promise<{
        message: string[];
    }>;
    findAll(status: UserStatus): Promise<{
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
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isMerchant: boolean;
        isEmailVerified: boolean;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string[];
    }>;
    remove(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isMerchant: boolean;
        isEmailVerified: boolean;
        status: import(".prisma/client").$Enums.UserStatus;
    }>;
    findOneByEmail(email: string): Promise<{
        merchant: {
            id: number;
            isVerified: boolean;
        };
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
    } & {
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
