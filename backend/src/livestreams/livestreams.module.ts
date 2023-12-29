import { Module } from '@nestjs/common';
import { LivestreamsService } from './livestreams.service';
import { LivestreamsController } from './livestreams.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [LivestreamsController],
  providers: [LivestreamsService],
  imports:[PrismaModule]
})
export class LivestreamsModule {}
