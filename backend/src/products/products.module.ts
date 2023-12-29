import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[PrismaModule]
})
export class ProductsModule {}
