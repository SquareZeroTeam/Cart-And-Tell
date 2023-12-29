import { OnModuleInit } from '@nestjs/common';
import { CreatePaymongoDto } from './dto/create-paymongo.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class PaymongoService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    checkout(createPaymongoDto: CreatePaymongoDto): Promise<{
        checkoutLink: any;
    }>;
    buynow(createPaymongoDto: CreatePaymongoDto): Promise<{
        checkoutLink: any;
    }>;
}
