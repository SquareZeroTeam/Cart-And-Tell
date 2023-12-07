import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantProductDto } from './dto/create-merchant-product.dto';
import { UpdateMerchantProductDto } from './dto/update-merchant-product.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';

@Injectable()
export class MerchantProductsService {
  constructor(
    private readonly prisma:PrismaService,
    private readonly supabase:SupabaseService 
    ) {}
  //To-do add Guards Here
  async create(id:number,image:Express.Multer.File,createMerchantProductDto:CreateMerchantProductDto) {
    const merchant = await this.prisma.merchant.findUnique({where:{id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    if (!image) {
      throw new BadRequestException("Please upload a image");
    }
    const imageLink = await this.supabase.uploadImage(image);
    createMerchantProductDto.image = imageLink;
    createMerchantProductDto.amount = parseFloat(createMerchantProductDto.amount.toString());
    const newProduct = await this.prisma.product.create({data:{...createMerchantProductDto,merchantId:id}});
    return {message:`Successfully created product ${newProduct.name}`,data:newProduct};
  }

  async findAll(merchantId:number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id:merchantId}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    return await this.prisma.product.findMany({where:{merchantId}});
  }

  async findOne(merchantId:number,id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id:merchantId}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    const product = await this.prisma.product.findUnique({where:{id}});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  update(id: number, updateMerchantProductDto: UpdateMerchantProductDto) {
    return `This action updates a #${id} merchantProduct`;
  }

  async remove(merchantId:number, id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id:merchantId}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    const product = await this.prisma.product.findUnique({where:{id}});
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return await this.prisma.product.delete({where:{id}});
  }
}
