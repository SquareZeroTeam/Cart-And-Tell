import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
@Module({
  controllers: [CartController],
  providers: [CartService,JwtService],
  imports:[PrismaModule]
})
export class CartModule {}
