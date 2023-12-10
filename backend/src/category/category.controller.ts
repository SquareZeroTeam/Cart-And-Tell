import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard,IsAdminGuard)
  create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,@UploadedFile(new ParseFilePipe({fileIsRequired:false,validators:[new MaxFileSizeValidator({maxSize:1024*1024*5}),new FileTypeValidator({fileType:"image/*"})]})) image:Express.Multer.File) {
    return this.categoryService.create(createCategoryDto,image);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard,IsAdminGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard,IsAdminGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile(new ParseFilePipe({fileIsRequired:false,validators:[new MaxFileSizeValidator({maxSize:1024*1024*5}),new FileTypeValidator({fileType:"image/*"})]})) image:Express.Multer.File) {
    return this.categoryService.update(+id,updateCategoryDto,image);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
