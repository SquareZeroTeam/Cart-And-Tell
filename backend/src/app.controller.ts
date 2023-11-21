import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { promisify } from 'util';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService ) {}

  @Get()
  hello() {
    return 'Cart-And-Tell API v1.0.0'
  }
  @Get('throttle')
  async throttle() {
    const delay = promisify(setTimeout);

    // Simulate a delay of 5 seconds
    await delay(5000);

    console.log('done');
    return { message: 'ok' };
  }
}
