import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OcbcService } from './ocbc.service';
import { CreateOcbcDto } from './dto/create-ocbc.dto';
import { UpdateOcbcDto } from './dto/update-ocbc.dto';

@Controller('ocbc')
export class OcbcController {
  constructor(private readonly ocbcService: OcbcService) { }

  // @Post()
  // create(@Body() createOcbcDto: CreateOcbcDto) {
  //   return this.ocbcService.create(createOcbcDto);
  // }

  // @Get()
  // findAll() {
  //   return this.ocbcService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ocbcService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOcbcDto: UpdateOcbcDto) {
  //   return this.ocbcService.update(+id, updateOcbcDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ocbcService.remove(+id);
  // }
}
