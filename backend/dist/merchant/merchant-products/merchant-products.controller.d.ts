/// <reference types="multer" />
import { MerchantProductsService } from './merchant-products.service';
import { CreateMerchantProductDto } from './dto/create-merchant-product.dto';
import { UpdateMerchantProductDto } from './dto/update-merchant-product.dto';
export declare class MerchantProductsController {
    private readonly merchantProductsService;
    constructor(merchantProductsService: MerchantProductsService);
    create(id: string, image: Express.Multer.File, createMerchantProductDto: CreateMerchantProductDto): Promise<{
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
    findAll(merchantId: string): Promise<{
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
    findOne(merchantId: string, id: string): Promise<{
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
    update(merchantId: string, id: string, image: Express.Multer.File, updateMerchantProductDto: UpdateMerchantProductDto): Promise<{
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
    remove(merchantId: string, id: string): Promise<{
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
