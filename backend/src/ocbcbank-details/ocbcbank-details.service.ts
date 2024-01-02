import { Injectable } from '@nestjs/common';
import { CreateOcbcbankDetailDto } from './dto/create-ocbcbank-detail.dto';
import { UpdateOcbcbankDetailDto } from './dto/update-ocbcbank-detail.dto';

@Injectable()
export class OcbcbankDetailsService {
  create(createOcbcbankDetailDto: CreateOcbcbankDetailDto) {
    return 'This action adds a new ocbcbankDetail';
  }

  findAll() {
    return `This action returns all ocbcbankDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ocbcbankDetail`;
  }

  update(id: number, updateOcbcbankDetailDto: UpdateOcbcbankDetailDto) {
    return `This action updates a #${id} ocbcbankDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} ocbcbankDetail`;
  }
}
