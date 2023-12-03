import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { SupabaseModule } from 'src/microservices/supabase/supabase.module';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService],
  imports:[PrismaModule,SupabaseModule]
})
export class MerchantModule {}
