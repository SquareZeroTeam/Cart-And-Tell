import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Module({
  controllers: [CartController],
  providers: [CartService,JwtService],
  imports:[PrismaModule]
})
export class CartModule {}
