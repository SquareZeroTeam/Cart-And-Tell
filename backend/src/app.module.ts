import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth/auth.module';
import { UserModule } from './user/user.module';
import { MerchantModule } from './merchant/merchant.module';
import { PaymongoModule } from './microservices/paymongo/paymongo.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { SupabaseModule } from './microservices/supabase/supabase.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PaymongoModule, MerchantModule, ProductsModule, PrismaModule, SupabaseModule, NodemailerModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
