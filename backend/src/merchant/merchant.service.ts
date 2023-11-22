import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MerchantService {
  constructor(private readonly prisma:PrismaService) {}
  create(createMerchantDto: CreateMerchantDto) {
    return 'This action adds a new merchant';
  }
  
  async findAll() {
    return await this.prisma.merchant.findMany({include:{products:true}}); 
  }

  findOne(id: number) {
    const merchant = this.prisma.merchant.findUnique({where:{id},include:{products:true}});
    if (merchant) {
      return merchant;
    }
    else {
      throw new NotFoundException("Merchant not found");
    }
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
}
