import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class IsAccountStatusActiveGuard {
    private readonly prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean | Observable<boolean>>;
}
