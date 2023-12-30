import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [CmsController],
  providers: [CmsService],
  imports: [PrismaModule]
})
export class CmsModule { }
