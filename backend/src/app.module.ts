import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth/auth.module';
import { UserModule } from './user/user.module';
import { MerchantModule } from './merchant/merchant.module';
import { PaymongoModule } from './microservices/paymongo/paymongo.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { SupabaseModule } from './microservices/supabase/supabase.module';
import { CategoryModule } from './category/category.module';
import { MessagesModule } from './messages/messages.module';
import { LivestreamsModule } from './livestreams/livestreams.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { NestMailerService } from './nest-mailer/nest-mailer.service';
import { VerifyEmailModule } from './verify-email/verify-email.module';
import { OcbcModule } from './microservices/ocbc/ocbc.module';
import { CmsModule } from './cms/cms.module';
@Module({
  imports: [ConfigModule.forRoot(),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    },
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  }), UserModule, AuthModule,/* PaymongoModule,*/ MerchantModule, ProductsModule, PrismaModule, SupabaseModule, CategoryModule, MessagesModule, LivestreamsModule, VerifyEmailModule, OcbcModule, CmsModule],
  controllers: [AppController],
  providers: [AppService, NestMailerService],
})
export class AppModule { }
