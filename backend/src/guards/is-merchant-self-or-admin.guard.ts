import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Injectable()
export class IsMerchantSelfOrAdminGuard implements CanActivate {
  constructor(private readonly jwt:JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    const userObj = this.jwt.decode(token);
    if (userObj.isMerchant && (userObj.merchant.id == request.params.id) || userObj.email == process.env.ADMIN_EMAIL) {
      return true
    }
    return false;
  }
}