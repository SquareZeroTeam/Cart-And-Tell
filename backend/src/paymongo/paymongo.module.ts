import { Module } from '@nestjs/common';
import { PaymongoService } from './paymongo.service';
import { PaymongoController } from './paymongo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymongoController],
  providers: [PaymongoService,PrismaService],
})
export class PaymongoModule {}
