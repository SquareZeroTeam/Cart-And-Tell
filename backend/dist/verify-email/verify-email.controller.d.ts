import { VerifyEmailService } from './verify-email.service';
export declare class VerifyEmailController {
    private readonly verifyEmailService;
    constructor(verifyEmailService: VerifyEmailService);
    findOne(id: string): Promise<{
        message: string;
    }>;
}
