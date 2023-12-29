import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from '../jwt/jwt.service';

@Module({
  imports: [UserModule,PrismaModule, PassportModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: "7d"}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy,JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
