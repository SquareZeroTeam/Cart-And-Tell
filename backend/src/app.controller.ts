import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymongoService } from './paymongo/paymongo.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly paymongo:PaymongoService ) {}

  @Get()
  hello() {
    return 'Cart-And-Tell API v1.0.0'
  }
}
