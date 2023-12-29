import { AuthService } from './auth.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private authService;
    private readonly prisma;
    private readonly userService;
    constructor(authService: AuthService, prisma: PrismaService, userService: UserService);
    login(req: any): any;
    protected(req: any): Promise<any>;
    protectedAdmin(req: any): any;
}
