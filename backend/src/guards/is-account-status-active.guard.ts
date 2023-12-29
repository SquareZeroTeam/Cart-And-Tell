import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class IsAccountStatusActiveGuard {
  constructor(private readonly prisma:PrismaService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (user.status != 'Active') {
      throw new ForbiddenException(`This account is ${user.status}`);
    }
    return true;
  }
}
