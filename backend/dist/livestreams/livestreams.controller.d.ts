import { LivestreamsService } from './livestreams.service';
export declare class LivestreamsController {
    private readonly livestreamsService;
    constructor(livestreamsService: LivestreamsService);
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
