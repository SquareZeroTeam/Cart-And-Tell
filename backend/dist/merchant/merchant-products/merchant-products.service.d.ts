/// <reference types="multer" />
import { CreateMerchantProductDto } from './dto/create-merchant-product.dto';
import { UpdateMerchantProductDto } from './dto/update-merchant-product.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
export declare class MerchantProductsService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    create(id: number, image: Express.Multer.File, createMerchantProductDto: CreateMerchantProductDto): Promise<{
        id: number;
        name: string;
        amount: number;
        description: string;
        image: string;
        rating: number;
        merchantId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(merchantId: number): Promise<{
        id: number;
        name: string;
        amount: number;
        description: string;
        image: string;
        rating: number;
        merchantId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(merchantId: number, id: number): Promise<{
        id: number;
        name: string;
        amount: number;
        description: string;
        image: string;
        rating: number;
        merchantId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(merchantId: number, id: number, image: Express.Multer.File | null, updateMerchantProductDto: UpdateMerchantProductDto): Promise<{
        id: number;
        name: string;
        amount: number;
        description: string;
        image: string;
        rating: number;
        merchantId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(merchantId: number, id: number): Promise<{
        id: number;
        name: string;
        amount: number;
        description: string;
        image: string;
        rating: number;
        merchantId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
