import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';

@Injectable()
export class MerchantService {
  constructor(
    private readonly prisma:PrismaService,
    private readonly supabase:SupabaseService
  ) {}
  async create(createMerchantDto: CreateMerchantDto,image:Express.Multer.File,proofOfAuthenticity:Express.Multer.File) {
    const user = await this.prisma.user.findUnique({where:{id:createMerchantDto.userId},include:{merchant:true}});
    if (!user.isMerchant) {
      throw new BadRequestException("This User is not registered as Merchant");
    }
    if (user.merchant) {
      throw new BadRequestException("This Merchant is already registered")
    }
    // Checks if an email or name already exists
    const merchantExist = await this.prisma.merchant.findFirst({
      where:{name:createMerchantDto.name}
    });
    if (merchantExist) {
      throw new BadRequestException("Merchant already exists");
    }
    //Supabase Image Upload implementation
    const imageLink:string = await this.supabase.uploadImage(image);
    const pdfLink:string = await this.supabase.uploadPDF(proofOfAuthenticity);
    createMerchantDto.categoryId = +createMerchantDto.categoryId //Converts to Int
    //Converts to ISO 8601 Date Format
    createMerchantDto.merchantStartValidity = new Date(createMerchantDto.merchantStartValidity)
    createMerchantDto.merchantEndValidity = new Date(createMerchantDto.merchantEndValidity)
    // Creates a new merchant
    const newMerchant =  await this.prisma.merchant.create({data:{...createMerchantDto,image:imageLink,proofOfAuthenticity:pdfLink}});
    return newMerchant;
  }
  
  async findAll(category:string) {
    if (category) {
      return await this.prisma.merchant.findMany({where:{category:{name:category}},include:{products:true}});
    }
    return await this.prisma.merchant.findMany({include:{products:true}}); 
  }

  async findOne(id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id},include:{products:true}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    return merchant;
  }

  async update(id: number, updateMerchantDto: UpdateMerchantDto,image:Express.Multer.File|null, proofOfAuthenticity:Express.Multer.File|null) {
    const merchant = await this.prisma.merchant.findUnique({where:{id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    const merchantExit = await this.prisma.merchant.findFirst({
      where: {
        OR:[
          {name:updateMerchantDto.name},
          {website:updateMerchantDto.website}
        ]
      }
    })
    if (merchantExit) {
      throw new BadRequestException("Merchant Name or Merchant Website already exists");
    }
    //Supabase Image Upload implementation
    if (!image && proofOfAuthenticity) {
      const pdfLink = await this.supabase.uploadPDF(proofOfAuthenticity);
      const updatedMerchant = await this.prisma.merchant.update({
        where:{id},
        data:{...updateMerchantDto,proofOfAuthenticity:pdfLink}
      })
      return updatedMerchant;
    }
    if (image && !proofOfAuthenticity) {
      const imageLink = await this.supabase.uploadImage(image);
      const updatedMerchant = await this.prisma.merchant.update({
        where:{id},
        data:{...updateMerchantDto,image:imageLink}
      });
      return updatedMerchant;
    }
    if (image && proofOfAuthenticity) {
      const imageLink = await this.supabase.uploadImage(image);
      const pdfLink = await this.supabase.uploadPDF(proofOfAuthenticity);
      const updatedMerchant = await this.prisma.merchant.update({
        where:{id},
        data:{
          ...updateMerchantDto,
          proofOfAuthenticity:pdfLink,
          image:imageLink
        }
      })
      return updatedMerchant;
    }
    const updatedMerchant = await this.prisma.merchant.update({
      where:{id},
      data:{...updateMerchantDto}
    });
    return updatedMerchant;
  }

  async remove(id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    return await this.prisma.merchant.delete({where:{id}});
  }
}
