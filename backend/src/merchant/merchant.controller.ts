import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesValidator } from './files.validator';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name:'image',maxCount:1},
    {name:'proofOfAuthenticity',maxCount:1}
  ]))
  create(
    @Body(new ValidationPipe()) createMerchantDto: CreateMerchantDto,
    @UploadedFiles(new ParseFilePipe({
      validators:[new FilesValidator({filesSchema:[
        {fieldName:'image',fileType:'image/*',maxSize:1024*1024*5},
        {fieldName:'proofOfAuthenticity',fileType:'application/pdf',maxSize:1024*1024*5}
      ]})]
    })) files: {[keys:string]:Express.Multer.File}
  ) {
    return this.merchantService.create(createMerchantDto,files.image[0],files.proofOfAuthenticity[0]);
  }

  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateMerchantDto: UpdateMerchantDto,
    @UploadedFile() image:Express.Multer.File
  ) {
    return this.merchantService.update(+id, updateMerchantDto,image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(+id);
  }

  // Merchant Products
}
