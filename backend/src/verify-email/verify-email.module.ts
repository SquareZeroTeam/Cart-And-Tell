import { Module } from '@nestjs/common';
import { VerifyEmailService } from './verify-email.service';
import { VerifyEmailController } from './verify-email.controller';
import { PrismaModule } from 'src/db/prisma/prisma.module';

@Module({
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService],
  imports:[PrismaModule]
})
export class VerifyEmailModule {}
