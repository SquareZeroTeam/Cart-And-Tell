import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class LivestreamService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(merchantId: number, createLivestreamDto: CreateLivestreamDto): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    findAll(merchantId: number): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }[]>;
    findOne(merchantId: number, id: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    update(merchantId: number, id: string, updateLivestreamDto: UpdateLivestreamDto): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    remove(merchantId: number, id: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
}
