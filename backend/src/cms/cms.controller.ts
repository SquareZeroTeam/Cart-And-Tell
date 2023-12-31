import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmsDto } from './dto/create-cms.dto';
import { UpdateCmsDto } from './dto/update-cms.dto';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import Prisma from '@prisma/client';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  create(@Body(new ValidationPipe()) createCmDto: CreateCmsDto) {
    return this.cmsService.create(createCmDto);
  }

  // @Get()
  // findAll() {
  //   return this.cmsService.findAll();
  // }

  @Get(':type')
  findOne(@Param('type') type: Prisma.$Enums.CMSType) {
    return this.cmsService.findOne(type);
  }

  @Patch(':type')
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  update(@Param('type') type: Prisma.$Enums.CMSType, @Body(new ValidationPipe()) updateCmDto: UpdateCmsDto) {
    return this.cmsService.update(type, updateCmDto);
  }

  // @Delete(':type')
  // remove(@Param('type') type: string) {
  //   return this.cmsService.remove(+type);
  // }
}
