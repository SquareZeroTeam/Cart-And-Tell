import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { SupabaseModule } from 'src/microservices/supabase/supabase.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,JwtService],
  imports:[PrismaModule,SupabaseModule]
})
export class CategoryModule {}
