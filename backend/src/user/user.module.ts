import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CartModule } from './cart/cart.module';
@Module({

  controllers: [UserController],
  providers: [UserService,PrismaService,JwtStrategy],
  exports: [UserService],
  imports: [CartModule]
})
export class UserModule {}
