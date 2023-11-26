import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtService {
    decode(token:string):{username:string,id:number} {
        try {
            return jwt.verify(token,process.env.JWT_SECRET) as { username: string; id: number };; 
        } catch (error) { 
            throw new UnauthorizedException("Invalid token"); 
        }
    }
}
