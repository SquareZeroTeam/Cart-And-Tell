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
    // Gets JWT Token
    const token = request.headers.authorization.split(" ")[1];
    // Converts JWT Token to User Object
    const userObj = this.jwt.decode(token);
    // Checks if the the id in the JWT Token matches the user 'Admin' or if the JWT Token matches the user id in the request
    if (userObj.id == request.params.userId) {
      return true;
    } else if (userObj.email == "cartandtell@gmail.com"){
      return true;
    }
    else {
      return false;
    }
  }
}
