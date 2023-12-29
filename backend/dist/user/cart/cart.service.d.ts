import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { DeleteCarDto } from './dto/delete-car.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto, userId: number): Promise<any>;
    findAll(userId: number): Promise<({
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
    })[]>;
    increment(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        quantity: number;
        productId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    decrement(id: number, userId: number): Promise<{
        id: number;
        userId: number;
        quantity: number;
        productId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(deleteCarDto: DeleteCarDto, userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
