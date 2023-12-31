import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma:PrismaService){}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({where:{id}});
    if (!product) {
      throw new NotFoundException("Product Not Found")
    }
    return product;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
