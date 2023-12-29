import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class NestMailerService {
    private readonly mailerService;
    private readonly prisma;
    constructor(mailerService: MailerService, prisma: PrismaService);
    sendEmailVerification(userId: number): Promise<void>;
    sendMerchantApproved(merchantId: number): Promise<void>;
    sendMerchantRejected(merchantId: number): Promise<void>;
}
