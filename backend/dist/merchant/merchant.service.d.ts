/// <reference types="multer" />
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
import { NestMailerService } from 'src/nest-mailer/nest-mailer.service';
export declare class MerchantService {
    private readonly prisma;
    private readonly supabase;
    private readonly nestMailer;
    constructor(prisma: PrismaService, supabase: SupabaseService, nestMailer: NestMailerService);
    create(createMerchantDto: CreateMerchantDto, image: Express.Multer.File, proofOfAuthenticity: Express.Multer.File): Promise<{
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
    findAll(status: string): Promise<({
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
    findAllVerified(category: string): Promise<({
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
    findAllUnVerified(category: string): Promise<({
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
    findOne(id: number): Promise<{
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
    update(id: number, updateMerchantDto: UpdateMerchantDto, image: Express.Multer.File | null, proofOfAuthenticity: Express.Multer.File | null): Promise<{
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
    approve(id: number): Promise<{
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
    reject(id: number): Promise<{
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
    remove(id: number): Promise<{
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
