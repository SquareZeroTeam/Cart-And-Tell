import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class VerifyEmailService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        message: string;
    }>;
}
