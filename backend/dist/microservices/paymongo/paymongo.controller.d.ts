import { PaymongoService } from './paymongo.service';
import { CreatePaymongoDto } from './dto/create-paymongo.dto';
export declare class PaymongoController {
    private readonly paymongoService;
    constructor(paymongoService: PaymongoService);
    checkout(createPaymongoDto: CreatePaymongoDto): Promise<{
        checkoutLink: any;
    }>;
    buynow(createPaymongoDto: CreatePaymongoDto): Promise<{
        checkoutLink: any;
    }>;
}
