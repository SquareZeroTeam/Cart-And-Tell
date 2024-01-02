import { Module } from '@nestjs/common';
import { OcbcbankDetailsService } from './ocbcbank-details.service';
import { OcbcbankDetailsController } from './ocbcbank-details.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [OcbcbankDetailsController],
  providers: [OcbcbankDetailsService],
  imports: [PrismaModule]
})
export class OcbcbankDetailsModule { }
