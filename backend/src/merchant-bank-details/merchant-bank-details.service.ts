import { Injectable } from '@nestjs/common';
import { CreateMerchantBankDetailDto } from './dto/create-merchant-bank-detail.dto';
import { UpdateMerchantBankDetailDto } from './dto/update-merchant-bank-detail.dto';

@Injectable()
export class MerchantBankDetailsService {
  create(createMerchantBankDetailDto: CreateMerchantBankDetailDto) {
    return 'This action adds a new merchantBankDetail';
  }

  findAll() {
    return `This action returns all merchantBankDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchantBankDetail`;
  }

  update(id: number, updateMerchantBankDetailDto: UpdateMerchantBankDetailDto) {
    return `This action updates a #${id} merchantBankDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchantBankDetail`;
  }
}
