import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerifyEmailService } from './verify-email.service';
import { CreateVerifyEmailDto } from './dto/create-verify-email.dto';
import { UpdateVerifyEmailDto } from './dto/update-verify-email.dto';

@Controller('verify-email')
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  // @Post()
  // create(@Body() createVerifyEmailDto: CreateVerifyEmailDto) {
  //   return this.verifyEmailService.create(createVerifyEmailDto);
  // }

  // @Get()
  // findAll() {
  //   return this.verifyEmailService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verifyEmailService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVerifyEmailDto: UpdateVerifyEmailDto) {
  //   return this.verifyEmailService.update(+id, updateVerifyEmailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.verifyEmailService.remove(+id);
  // }
}
