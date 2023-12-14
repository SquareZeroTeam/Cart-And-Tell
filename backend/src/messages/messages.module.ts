import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';

@Module({
  providers: [MessagesGateway, MessagesService, JwtService],
  imports:[PrismaModule]
})
export class MessagesModule {}
