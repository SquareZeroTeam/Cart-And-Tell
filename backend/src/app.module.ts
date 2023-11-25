import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './db/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MerchantModule } from './merchant/merchant.module';
import { PaymongoModule } from './microservices/paymongo/paymongo.module';
import { SupabaseService } from './microservices/supabase/supabase.service';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PaymongoModule, MerchantModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SupabaseService],
})
export class AppModule {}
