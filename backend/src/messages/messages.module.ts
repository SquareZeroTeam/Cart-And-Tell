import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { LivestreamsModule } from 'src/livestreams/livestreams.module';
import { AuthModule } from 'src/authentication/auth/auth.module';

@Module({
  providers: [MessagesGateway, MessagesService, JwtService],
  imports: [PrismaModule, LivestreamsModule]
})
export class MessagesModule { }
