import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';

@Injectable()
export class CategoryService {
  constructor(private prisma:PrismaService, private supabase:SupabaseService) {}
  async create(createCategoryDto: CreateCategoryDto,image:Express.Multer.File) {
    if (!image) {
      return await this.prisma.category.create({data: createCategoryDto});
    }
    const imageLink = await this.supabase.uploadImage(image);
    return await this.prisma.category.create({data:{...createCategoryDto,icon:imageLink}});
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({where:{id}});
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto,image:Express.Multer.File) {
    if (!image) {
      return await this.prisma.category.update({where:{id},data: updateCategoryDto});
    }
    const imageLink = await this.supabase.uploadImage(image);
    return await this.prisma.category.update({where:{id:id},data:{...updateCategoryDto,icon:imageLink}});
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({where:{id},include:{merchant:true}});
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    if (category.merchant.length > 0) {
      throw new BadRequestException(`Category #${id} is used by merchant(s)`);
    }
    return await this.prisma.category.delete({where:{id}});
  }
}
