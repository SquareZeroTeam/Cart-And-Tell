import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
export declare class AuthService {
    private UserService;
    private jwtService;
    private prisma;
    constructor(UserService: UserService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
