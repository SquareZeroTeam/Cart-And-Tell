import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCmsDto } from './dto/create-cms.dto';
import { UpdateCmsDto } from './dto/update-cms.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import Prisma from '@prisma/client';
@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createCmsDto: CreateCmsDto) {
    const content = await this.prisma.cMS.findUnique({
      where: {
        type: createCmsDto.type
      }
    });
    if (content) {
      throw new BadRequestException(`${createCmsDto.type} is already configured`)
    }
    return this.prisma.cMS.create({ data: createCmsDto })
  }

  // findAll() {
  //   return `This action returns all cms`;
  // }

  async findOne(type: Prisma.$Enums.CMSType) {
    const content = await this.prisma.cMS.findUnique({
      where: {
        type
      }
    })
    if (!content) {
      throw new BadRequestException(`${type} is not yet configured`)
    }
    return content
  }

  async update(type: Prisma.$Enums.CMSType, updateCmsDto: UpdateCmsDto) {
    const content = await this.prisma.cMS.findUnique({
      where: {
        type
      }
    });
    if (!content) {
      throw new BadRequestException(`${type} is not yet configured`)
    }
    const form: {} = {}
    if (updateCmsDto.html) {
      form['html'] = updateCmsDto.html
    }
    if (updateCmsDto.type) {
      form['type'] = updateCmsDto.type
    }
    return await this.prisma.cMS.update({ where: { type }, data: updateCmsDto })
  }

  // remove(type: number) {
  //   return `This action removes a #${type} cm`;
  // }
}
