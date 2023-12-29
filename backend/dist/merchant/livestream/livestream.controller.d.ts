import { LivestreamService } from './livestream.service';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
export declare class LivestreamController {
    private readonly livestreamService;
    constructor(livestreamService: LivestreamService);
    create(createLivestreamDto: CreateLivestreamDto, merchantId: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    findAll(merchantId: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }[]>;
    findOne(merchantId: string, id: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    update(merchantId: string, id: string, updateLivestreamDto: UpdateLivestreamDto): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
    remove(merchantId: string, id: string): Promise<{
        roomId: string;
        merchantId: number;
        productId: number;
    }>;
}
