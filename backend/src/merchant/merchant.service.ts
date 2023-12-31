import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
import { NestMailerService } from 'src/nest-mailer/nest-mailer.service';
import { merchantStatus } from '@prisma/client';

@Injectable()
export class MerchantService {
  constructor(
    private readonly prisma:PrismaService,
    private readonly supabase:SupabaseService,
    private readonly nestMailer:NestMailerService
  ) {}
  async create(createMerchantDto: CreateMerchantDto,image:Express.Multer.File,proofOfAuthenticity:Express.Multer.File) {
    const user = await this.prisma.user.findUnique({where:{id:+createMerchantDto.userId},include:{merchant:true}});
    if (!user) {
      throw new NotFoundException("User not found");
    }
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
    createMerchantDto.userId = +createMerchantDto.userId //Converts to Int
    //Converts to ISO 8601 Date Format
    createMerchantDto.merchantStartValidity = new Date(createMerchantDto.merchantStartValidity)
    createMerchantDto.merchantEndValidity = new Date(createMerchantDto.merchantEndValidity)
    // Creates a new merchant
    const newMerchant =  await this.prisma.merchant.create({data:{...createMerchantDto,image:imageLink,proofOfAuthenticity:pdfLink}});
    return newMerchant;
  }
  
  async findAll(status:string) {
    const query:{[any:string]:merchantStatus} = {};
    console.log(status)
    if (status) {
      if (status !== merchantStatus.Approved && status !== merchantStatus.Pending && status !== merchantStatus.Rejected && status !== merchantStatus.Removed) {
        throw new BadRequestException('Invalid status')
      }
      query.status = status;
      console.log(query);
    }
    return await this.prisma.merchant.findMany({where:{status:query.status},include:{products:true,user:true,category:true}}); 
  }
  async findAllVerified(category:string) {
    console.log(category);
    if (category) {
      return await this.prisma.merchant.findMany({where:{isVerified:true,category:{name:category}},include:{products:true,user:true,category:true}}); 
    }
    return await this.prisma.merchant.findMany({where:{isVerified:true},include:{products:true,user:true,category:true}}); 
  }
  async findAllUnVerified(category:string) {
    if (category) {
      return await this.prisma.merchant.findMany({where:{isVerified:false,category:{name:category}},include:{products:true,user:true,category:true}}); 
    }
    return await this.prisma.merchant.findMany({where:{isVerified:false},include:{products:true,user:true,category:true}}); 
  }
  async findCartAndTell() {
    const cartandtellUser = await this.prisma.user.findUnique({where:{email:process.env.ADMIN_EMAIL}});
    if (!cartandtellUser) {
      throw new NotFoundException("Cart and Tell User not found, Please Set Up");
    }
    const cartandtellMerchant = await this.prisma.merchant.findUnique({where:{userId:cartandtellUser.id},include:{products:true}});
    if (!cartandtellMerchant) {
      throw new NotFoundException("Cart and Tell Merchant not found, Please Set Up");
    }
    return cartandtellMerchant;
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
    if (updateMerchantDto.categoryId) {
      updateMerchantDto.categoryId = +updateMerchantDto.categoryId //Converts to Int
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
    if (updateMerchantDto.isVerified) {
      updateMerchantDto.isVerified = new RegExp("true").test(updateMerchantDto.isVerified.toString());
    }
    const updatedMerchant = await this.prisma.merchant.update({
      where:{id},
      data:{...updateMerchantDto}
    });
    return updatedMerchant;
  }
  async approve(id:number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id},include:{user:true}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    if (merchant.isVerified) {
      throw new BadRequestException("Merchant is already verified");
    }
    const updatedMerchant = await this.prisma.merchant.update({
      where:{id},
      data:{isVerified:true,status:'Approved'}
    });
    this.nestMailer.sendMerchantApproved(merchant.id);
    return updatedMerchant;
  }
  async reject(id:number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id},include:{user:true}});
    const user = await this.prisma.user.findUnique({where:{id:merchant.user.id}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    if (merchant.isVerified) {
      throw new BadRequestException("Merchant is already verified");
    }
    await this.nestMailer.sendMerchantRejected(merchant.id);
    const rejectedMerchant = await this.prisma.merchant.delete({
      where:{id},
    });
    return rejectedMerchant;
  }
  async remove(id: number) {
    const merchant = await this.prisma.merchant.findUnique({where:{id},include:{products:true,user:true}});
    if (!merchant) {
      throw new NotFoundException("Merchant not found");
    }
    if (merchant.products.length > 0) {
      throw new BadRequestException("Merchant has products, please delete the products first");
    }
    if (merchant.user.email === process.env.ADMIN_EMAIL) {
      throw new BadRequestException("Merchant is ADMIN, cannot be removed");
    }
    return await this.prisma.merchant.delete({where:{id}});
  }
}
