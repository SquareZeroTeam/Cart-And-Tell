import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerchantBankDetailsService } from './merchant-bank-details.service';
import { CreateMerchantBankDetailDto } from './dto/create-merchant-bank-detail.dto';
import { UpdateMerchantBankDetailDto } from './dto/update-merchant-bank-detail.dto';

@Controller('merchant-bank-details')
export class MerchantBankDetailsController {
  constructor(private readonly merchantBankDetailsService: MerchantBankDetailsService) {}

  @Post()
  create(@Body() createMerchantBankDetailDto: CreateMerchantBankDetailDto) {
    return this.merchantBankDetailsService.create(createMerchantBankDetailDto);
  }

  @Get()
  findAll() {
    return this.merchantBankDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantBankDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantBankDetailDto: UpdateMerchantBankDetailDto) {
    return this.merchantBankDetailsService.update(+id, updateMerchantBankDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantBankDetailsService.remove(+id);
  }
}
