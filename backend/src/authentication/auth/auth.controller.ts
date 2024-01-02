import { Controller, Post, Get, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { IsAccountStatusActiveGuard } from 'src/guards/is-account-status-active.guard';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { IsEmailVerifiedGuard } from 'src/guards/is-email-verified.guard';

// Note: The LocalAuthGuard will create a variable in request as [req.user] which contains the full object of the user
//       Its contents is also accessible in any guards

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly prisma: PrismaService, private readonly userService: UserService) { }
    @Post('login')
    @UseGuards(LocalAuthGuard, IsEmailVerifiedGuard)
    login(@Request() req): any {
        return this.authService.login(req.user);
    }
    @Get('validate')
    @UseGuards(JwtAuthGuard, IsAccountStatusActiveGuard)
    async protected(@Request() req): Promise<any> {
        return req.user;
    }
    @Get('validateAsAdmin')
    @UseGuards(JwtAuthGuard, IsAdminGuard)
    protectedAdmin(@Request() req): any {
        return req.user;
    }
}
