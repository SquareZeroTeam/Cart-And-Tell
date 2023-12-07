import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    createMerchantDto.image = imageLink;
    createMerchantDto.proofOfAuthenticity = pdfLink;
    createMerchantDto.categoryId = +createMerchantDto.categoryId //Converts to Int
    //Converts to ISO 8601 Date Format
    createMerchantDto.merchantStartValidity = new Date(createMerchantDto.merchantStartValidity)
    createMerchantDto.merchantEndValidity = new Date(createMerchantDto.merchantEndValidity)
    // Creates a new merchant
    const newMerchant =  await this.prisma.merchant.create({data:{...createMerchantDto}});
    return newMerchant;
  }
  
  async findAll() {
    return await this.prisma.merchant.findMany({include:{products:true}}); 
  }

  async findOne(id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id},include:{products:true}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    return merchant;
  }

  async update(id: number, updateMerchantDto: UpdateMerchantDto,image:Express.Multer.File) {
    const merchant = await this.prisma.merchant.findUnique({where:{id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    const merchantExit = await this.prisma.merchant.findFirst({
      where: {
        OR:[
          {name:updateMerchantDto.name},
        ]
      }
    })
    if (merchantExit) {
      throw new BadRequestException("Merchant already exists");
    }
    //Supabase Image Upload implementation
    if (image) {
      const imageLink = await this.supabase.uploadImage(image);
      const updatedMerchant = await this.prisma.merchant.update({
        where:{id},
        data:{...updateMerchantDto,image:imageLink}
      });
    }
    const updatedMerchant = await this.prisma.merchant.update({
      where:{id},
      data:{...updateMerchantDto}
    });
    return {message:`Successfully updated Merchant ${updatedMerchant.name}`,};
  }


  //To-do add Guards Here
  async remove(id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    this.prisma.merchant.delete({where:{id}});
    return {message:`Successfully deleted Merchant ${merchant.name}`};
  }
}
