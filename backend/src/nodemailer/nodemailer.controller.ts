import { Controller, Get } from '@nestjs/common';

@Controller('nodemailer')
export class NodemailerController {

    @Get()
    async sendMail() {
        
    }
}
