import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles, UseGuards, Headers, BadRequestException, Query } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesValidator } from './files.validator';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsMerchantSelfOrAdminGuard } from 'src/guards/is-merchant-self-or-admin.guard';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { merchantStatus } from '@prisma/client';
import { IsEmailVerifiedGuard } from 'src/guards/is-email-verified.guard';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService, private readonly jwt: JwtService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'proofOfAuthenticity', maxCount: 1 }
  ]))
  create(
    @Body(new ValidationPipe()) createMerchantDto: CreateMerchantDto,
    @UploadedFiles(new ParseFilePipe({
      validators: [new FilesValidator({
        filesSchema: [
          { fieldName: 'image', fileType: 'image/*', maxSize: 1024 * 1024 * 5 },
          { fieldName: 'proofOfAuthenticity', fileType: 'application/pdf', maxSize: 1024 * 1024 * 5 }
        ]
      })]
    })) files: { [keys: string]: Express.Multer.File },
    @Headers("Authorization") token: string
  ) {
    return this.merchantService.create(createMerchantDto, files.image[0], files.proofOfAuthenticity[0]);
  }
  @Get()
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  findAll(
    @Query('status') status: merchantStatus,
  ) {
    return this.merchantService.findAll(status);
  }
  @Get("/verified")
  findAllVerfied(@Query('category') category: string) {
    return this.merchantService.findAllVerified(category);
  }
  @Get("/unVerified")
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  findAllUnVerfied(@Query('category') category: string) {
    return this.merchantService.findAllUnVerified(category);
  }
  @Get("/cartandtell")
  findCartAndTell() {
    return this.merchantService.findCartAndTell();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(+id);
  }
  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  approve(@Param('id') id: string) {
    return this.merchantService.approve(+id);
  }
  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  reject(@Param('id') id: string) {
    return this.merchantService.reject(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsMerchantSelfOrAdminGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'proofOfAuthenticity', maxCount: 1 }
  ]))
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateMerchantDto: UpdateMerchantDto,
    @UploadedFiles(
    ) files: { [keys: string]: Express.Multer.File }
  ) {
    const maxFileSize = 1024 * 1024 * 5 //5mb
    if (!files.image) {
      files.image = null;
    }
    else {
      const pattern = new RegExp("image/*");
      if (!pattern.test(files.image[0].mimetype)) {
        throw new BadRequestException("image is not a type of image/*")
      }
      if (files.image[0].size > maxFileSize) {
        throw new BadRequestException("image must be less than " + maxFileSize + " bytes");
      }
      files.image = files.image[0];
    }
    if (!files.proofOfAuthenticity) {
      files.proofOfAuthenticity = null;
    }
    else {
      const pattern = new RegExp("application/pdf");
      if (!pattern.test(files.proofOfAuthenticity[0].mimetype)) {
        throw new BadRequestException("proofOfAuthenticity is not a type of application/pdf");
      }
      if (files.proofOfAuthenticity[0].size > maxFileSize) {
        throw new BadRequestException("proofOfAuthenticity must be less than " + maxFileSize + " bytes")
      }
      files.proofOfAuthenticity = files.proofOfAuthenticity[0]
    }
    return this.merchantService.update(+id, updateMerchantDto, files.image, files.proofOfAuthenticity);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id);
  }
}
