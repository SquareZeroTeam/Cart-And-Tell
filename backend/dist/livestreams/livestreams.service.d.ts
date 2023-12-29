import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class LivestreamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLivestreamDto: CreateLivestreamDto): string;
    findAll(): Promise<({
        merchant: {
            category: {
                id: number;
                name: string;
                icon: string;
            };
            name: string;
            image: string;
        };
    } & {
        roomId: string;
        merchantId: number;
        productId: number;
    })[]>;
    findOne(roomId: string): Promise<{
        merchant: {
            category: {
                id: number;
                name: string;
                icon: string;
            };
            id: number;
            name: string;
            image: string;
        };
    } & {
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
}
