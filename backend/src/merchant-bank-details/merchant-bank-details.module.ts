import { Module } from '@nestjs/common';
import { MerchantBankDetailsService } from './merchant-bank-details.service';
import { MerchantBankDetailsController } from './merchant-bank-details.controller';

@Module({
  controllers: [MerchantBankDetailsController],
  providers: [MerchantBankDetailsService],
})
export class MerchantBankDetailsModule {}
