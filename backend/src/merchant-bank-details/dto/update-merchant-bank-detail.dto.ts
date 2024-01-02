import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantBankDetailDto } from './create-merchant-bank-detail.dto';

export class UpdateMerchantBankDetailDto extends PartialType(CreateMerchantBankDetailDto) {}
