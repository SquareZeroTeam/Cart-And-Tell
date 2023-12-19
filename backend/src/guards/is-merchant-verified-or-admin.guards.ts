import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class IsMerchantVerifiedOrAdmin {
  constructor(private readonly jwt:JwtService,private readonly prisma:PrismaService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    const userObj = this.jwt.decode(token);
    const verifyObj = await this.prisma.merchant.findUnique({where:{id:userObj.merchant.id}});
    if (verifyObj.isVerified) {
      return true
    }
    else if (userObj.email == process.env.ADMIN_EMAIL) {
      return true;
    }
    return false;
  }
}
