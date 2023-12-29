import { AppService } from './app.service';
import { PrismaService } from './db/prisma/prisma.service';
import { NestMailerService } from './nest-mailer/nest-mailer.service';
export declare class AppController {
    private readonly appService;
    private readonly prisma;
    private readonly nestMailer;
    constructor(appService: AppService, prisma: PrismaService, nestMailer: NestMailerService);
    hello(): {
        message: string;
    };
    throttle(): Promise<{
        message: string;
    }>;
    testEmail(): Promise<{
        message: string;
    }>;
}
