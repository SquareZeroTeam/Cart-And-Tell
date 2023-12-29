import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
