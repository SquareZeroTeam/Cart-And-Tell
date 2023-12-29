/// <reference types="multer" />
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { merchantStatus } from '@prisma/client';
export declare class MerchantController {
    private readonly merchantService;
    private readonly jwt;
    constructor(merchantService: MerchantService, jwt: JwtService);
    create(createMerchantDto: CreateMerchantDto, files: {
        [keys: string]: Express.Multer.File;
    }, token: string): Promise<{
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
    }>;
    findAll(status: merchantStatus): Promise<({
        user: {
            id: number;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            isMerchant: boolean;
            isEmailVerified: boolean;
            status: import(".prisma/client").$Enums.UserStatus;
        };
        category: {
            id: number;
            name: string;
            icon: string;
        };
        products: {
            id: number;
            name: string;
            amount: number;
            description: string;
            image: string;
            rating: number;
            merchantId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    })[]>;
    findAllVerfied(category: string): Promise<({
        user: {
            id: number;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            isMerchant: boolean;
            isEmailVerified: boolean;
            status: import(".prisma/client").$Enums.UserStatus;
        };
        category: {
            id: number;
            name: string;
            icon: string;
        };
        products: {
            id: number;
            name: string;
            amount: number;
            description: string;
            image: string;
            rating: number;
            merchantId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    })[]>;
    findAllUnVerfied(category: string): Promise<({
        user: {
            id: number;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            isMerchant: boolean;
            isEmailVerified: boolean;
            status: import(".prisma/client").$Enums.UserStatus;
        };
        category: {
            id: number;
            name: string;
            icon: string;
        };
        products: {
            id: number;
            name: string;
            amount: number;
            description: string;
            image: string;
            rating: number;
            merchantId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    })[]>;
    findCartAndTell(): Promise<{
        products: {
            id: number;
            name: string;
            amount: number;
            description: string;
            image: string;
            rating: number;
            merchantId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    findOne(id: string): Promise<{
        products: {
            id: number;
            name: string;
            amount: number;
            description: string;
            image: string;
            rating: number;
            merchantId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    approve(id: string): Promise<{
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
    }>;
    reject(id: string): Promise<{
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
    }>;
    update(id: string, updateMerchantDto: UpdateMerchantDto, files: {
        [keys: string]: Express.Multer.File;
    }): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
