import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req):any {
        return this.authService.login(req.user);
    }
    @Get('validate')
    @UseGuards(JwtAuthGuard)
    protected(@Request() req):any {
        return req.user;
    }
    @Get('validateAsAdmin')
    @UseGuards(JwtAuthGuard,IsAdminGuard)
    protectedAdmin(@Request() req):any {
        return req.user;
    }
}
