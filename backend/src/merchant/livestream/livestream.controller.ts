import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { LivestreamService } from './livestream.service';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
import { IsMerchantSelfOrAdminProductsGuard } from 'src/guards/is-merchant-self-or-admin-products.guard';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';
import { IsEmailVerifiedGuard } from 'src/guards/is-email-verified.guard';
@Controller('merchant/:merchantId/livestream')
export class LivestreamController {
  constructor(private readonly livestreamService: LivestreamService) { }

  @Post()
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsMerchantSelfOrAdminProductsGuard)
  create(@Body(new ValidationPipe()) createLivestreamDto: CreateLivestreamDto, @Param('merchantId') merchantId: string) {
    return this.livestreamService.create(+merchantId, createLivestreamDto);
  }

  @Get()
  findAll(@Param('merchantId') merchantId: string) {
    return this.livestreamService.findAll(+merchantId);
  }

  @Get(':id')
  findOne(@Param('merchantId') merchantId: string, @Param('id') id: string) {
    return this.livestreamService.findOne(+merchantId, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsMerchantSelfOrAdminProductsGuard)
  update(@Param('merchantId') merchantId: string, @Param('id') id: string, @Body() updateLivestreamDto: UpdateLivestreamDto) {
    return this.livestreamService.update(+merchantId, id, updateLivestreamDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsEmailVerifiedGuard, IsMerchantSelfOrAdminProductsGuard)
  remove(@Param('merchantId') merchantId: string, @Param('id') id: string) {
    return this.livestreamService.remove(+merchantId, id);
  }
}
