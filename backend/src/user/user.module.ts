import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { JwtStrategy } from 'src/authentication/auth/jwt.strategy';
import { CartModule } from './cart/cart.module';
import { PaymongoService } from 'src/microservices/paymongo/paymongo.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
@Module({

  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserService],
  imports: [CartModule, PrismaModule]
})
export class UserModule {}
