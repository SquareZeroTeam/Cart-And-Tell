import { Module } from '@nestjs/common';
import { MerchantProductsService } from './merchant-products.service';
import { MerchantProductsController } from './merchant-products.controller';
import { SupabaseModule } from 'src/microservices/supabase/supabase.module';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Module({
  controllers: [MerchantProductsController],
  providers: [MerchantProductsService,JwtService],
  imports:[SupabaseModule,PrismaModule]
})
export class MerchantProductsModule {}
