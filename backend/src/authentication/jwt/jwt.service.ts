import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtService {
    decode(token:string):{email:string,id:number} {
        try {
            return jwt.verify(token,process.env.JWT_SECRET) as { email: string; id: number };; 
        } catch (error) { 
            throw new UnauthorizedException("Invalid token"); 
        }
    }
}
