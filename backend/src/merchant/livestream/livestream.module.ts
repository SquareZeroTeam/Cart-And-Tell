import { Module } from '@nestjs/common';
import { LivestreamService } from './livestream.service';
import { LivestreamController } from './livestream.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Module({
  controllers: [LivestreamController],
  providers: [LivestreamService,JwtService],
  imports:[PrismaModule]
})
export class LivestreamModule {}
