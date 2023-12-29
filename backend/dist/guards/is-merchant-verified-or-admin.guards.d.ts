import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class IsMerchantVerifiedOrAdmin {
    private readonly jwt;
    private readonly prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean | Observable<boolean>>;
}
