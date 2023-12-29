import { Module } from '@nestjs/common';
import { OcbcService } from './ocbc.service';
import { OcbcController } from './ocbc.controller';

@Module({
  controllers: [OcbcController],
  providers: [OcbcService],
})
export class OcbcModule {}
