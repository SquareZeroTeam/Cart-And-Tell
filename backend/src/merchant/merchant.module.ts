import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { SupabaseModule } from 'src/microservices/supabase/supabase.module';
import { MerchantProductsModule } from './merchant-products/merchant-products.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { LivestreamModule } from './livestream/livestream.module';
import { NestMailerService } from 'src/nest-mailer/nest-mailer.service';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService,JwtService,NestMailerService],
  imports:[PrismaModule,SupabaseModule, MerchantProductsModule, LivestreamModule]
})
export class MerchantModule {}
