import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PaymongoService } from './paymongo.service';
import { CreatePaymongoDto } from './dto/create-paymongo.dto';
// import { UpdatePaymongoDto } from './dto/update-paymongo.dto';

@Controller('paymongo')
export class PaymongoController {
  constructor(private readonly paymongoService: PaymongoService) {}

  @Post('checkout')
  checkout(@Body(new ValidationPipe) createPaymongoDto: CreatePaymongoDto) {
    return this.paymongoService.checkout(createPaymongoDto);
  }
  @Post('buynow')
  buynow(@Body(new ValidationPipe) createPaymongoDto: CreatePaymongoDto) {
    return this.paymongoService.buynow(createPaymongoDto);
  }
}
