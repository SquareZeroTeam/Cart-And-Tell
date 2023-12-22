import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Injectable()
export class IsUserSelfOrAdminGuard implements CanActivate {
  constructor(private readonly jwt:JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.id == request.params.userId) {
      return true;
    } else if (request.user.email == process.env.ADMIN_EMAIL){
      return true;
    }
    else {
      return false;
    }
  }
}
