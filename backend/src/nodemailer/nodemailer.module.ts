import { Module } from '@nestjs/common';
import { NodemailerController } from './nodemailer.controller';

@Module({
  controllers: [NodemailerController]
})
export class NodemailerModule {}
