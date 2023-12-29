import { Module } from '@nestjs/common';
import { PaymongoService } from './paymongo.service';
import { PaymongoController } from './paymongo.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [PaymongoController],
  providers: [PaymongoService],
  imports:[PrismaModule]
})
export class PaymongoModule {}
