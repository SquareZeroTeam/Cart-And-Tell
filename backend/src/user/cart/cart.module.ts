import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { JwtService } from 'src/authentication/jwt/jwt.service';
@Module({
  controllers: [CartController],
  providers: [CartService,PrismaService,JwtService],
})
export class CartModule {}
