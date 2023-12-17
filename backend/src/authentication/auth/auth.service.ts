import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcryptjs";
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private UserService:UserService, 
        private jwtService:JwtService,
        private prisma:PrismaService
        ){}
    // Authenticates email and Password
    async validateUser(email:string, password:string):Promise<any> {
        const user = await this.UserService.findOneByEmail(email);
        const result = (user) ? bcrypt.compareSync(password, user.password): false;
        if (user && result) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    // Returns JWT Bearer Token
    async login(user:any) {
        const payload = {email: user.email, id: user.id,isMerchant:user.isMerchant,merchant:user.merchant,status:user.status};
        return {
            // Calls Passport JWTStrategy
            access_token: this.jwtService.sign(payload)
        }
    }
}
