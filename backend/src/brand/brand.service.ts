import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma:PrismaService) {}
  async create(createBrandDto: CreateBrandDto) {
    const brandExist = await this.prisma.brand.findUnique({where:{name:createBrandDto.name}});
    if (brandExist) {
      throw new HttpException('Brand already exist',HttpStatus.BAD_REQUEST);
    }
    return this.prisma.brand.create({data:createBrandDto});
  }

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async findOne(id: number) {
    const brand = await this.prisma.brand.findUnique({where:{id}});
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brandExist = await this.prisma.brand.findUnique({where:{id}});
    if (!brandExist) {
      throw new HttpException('Brand not found',HttpStatus.BAD_REQUEST);
    }
    return this.prisma.brand.update({where:{id},data:updateBrandDto});
  }
  // Todo: Add Guards Here
  async remove(id: number) {
    return await this.prisma.brand.delete({where:{id}});
  }
}
