import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PaymongoModule } from './paymongo/paymongo.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PaymongoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
