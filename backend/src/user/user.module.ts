import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { JwtStrategy } from 'src/authentication/auth/jwt.strategy';
import { PaymongoService } from 'src/microservices/paymongo/paymongo.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { CartModule } from './cart/cart.module';
@Module({

  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserService],
  imports: [PrismaModule,CartModule]
})
export class UserModule {}
