import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService,SupabaseService],
  imports:[PrismaModule]
})
export class MerchantModule {}
