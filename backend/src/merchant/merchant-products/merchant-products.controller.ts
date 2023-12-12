import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, FileValidator, ValidationPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { MerchantProductsService } from './merchant-products.service';
import { CreateMerchantProductDto } from './dto/create-merchant-product.dto';
import { UpdateMerchantProductDto } from './dto/update-merchant-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsMerchantSelfOrAdminProductsGuard } from 'src/guards/is-merchant-self-or-admin-products.guard';

@Controller('merchant/:merchantId/products')
export class MerchantProductsController {
  constructor(private readonly merchantProductsService: MerchantProductsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard,IsMerchantSelfOrAdminProductsGuard)
  create(
    @Param('merchantId') id: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024*1024*5 ,message(maxSize) {
          return `Maximum file size is ${maxSize/1024/1024}MB`;
        },}),
        new FileTypeValidator({ fileType: 'image/*'}),
      ],
    }),) image:Express.Multer.File,
    @Body(new ValidationPipe()) createMerchantProductDto:CreateMerchantProductDto) {
    return this.merchantProductsService.create(+id,image,createMerchantProductDto);
  } 

  @Get()
  findAll(@Param('merchantId') merchantId: string) {
    return this.merchantProductsService.findAll(+merchantId);
  }

  @Get(':id')
  findOne(@Param('merchantId') merchantId: string,@Param('id') id: string) {
    return this.merchantProductsService.findOne(+merchantId,+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard,IsMerchantSelfOrAdminProductsGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('merchantId') merchantId: string,
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe({
      fileIsRequired:false,
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024*1024*5 ,message(maxSize) {
          return `Maximum file size is ${maxSize/1024/1024}MB`;
        },}),
        new FileTypeValidator({ fileType: 'image/*'}),
      ],
    }),) image:Express.Multer.File,
    @Body() updateMerchantProductDto: UpdateMerchantProductDto) {
    return this.merchantProductsService.update(+merchantId,+id, image,updateMerchantProductDto);
  }

  @Delete(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard,IsMerchantSelfOrAdminProductsGuard)
  remove(@Param('merchantId') merchantId: string,@Param('id') id: string) {
    return this.merchantProductsService.remove(+merchantId,+id);
  }
}

