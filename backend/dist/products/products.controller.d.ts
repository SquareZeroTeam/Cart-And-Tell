import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
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
