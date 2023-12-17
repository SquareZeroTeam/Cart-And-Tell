import { Controller, Post, Get, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { IsAccountStatusActiveGuard } from 'src/guards/is-account-status-active.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req):any {
        return this.authService.login(req.user);
    }
    @Get('validate')
    @UseGuards(JwtAuthGuard,IsAccountStatusActiveGuard)
    protected(@Request() req):any {
        if (req.user.status === 'Active') {
        return req.user;
        }
        else {
            throw new ForbiddenException(`This Account is ${req.user.status}`)
        }
    }
    @Get('validateAsAdmin')
    @UseGuards(JwtAuthGuard,IsAdminGuard)
    protectedAdmin(@Request() req):any {
        return req.user;
    }
}
