import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OcbcbankDetailsService } from './ocbcbank-details.service';
import { CreateOcbcbankDetailDto } from './dto/create-ocbcbank-detail.dto';
import { UpdateOcbcbankDetailDto } from './dto/update-ocbcbank-detail.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';

@Controller('ocbcbank-details')
@UseGuards(JwtAuthGuard, IsAdminGuard)
export class OcbcbankDetailsController {
  constructor(private readonly ocbcbankDetailsService: OcbcbankDetailsService) { }

  @Post()
  create(@Body() createOcbcbankDetailDto: CreateOcbcbankDetailDto) {
    return this.ocbcbankDetailsService.create(createOcbcbankDetailDto);
  }

  @Get()
  findAll() {
    return this.ocbcbankDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ocbcbankDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOcbcbankDetailDto: UpdateOcbcbankDetailDto) {
    return this.ocbcbankDetailsService.update(+id, updateOcbcbankDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ocbcbankDetailsService.remove(+id);
  }
}
