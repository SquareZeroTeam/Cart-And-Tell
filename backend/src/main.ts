import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as logger from "morgan"
import { join } from 'path';
import { ExpressPeerServer } from 'peer';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(logger('dev'));
  app.use(helmet()); //protect against common backend vulnerability
  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.enableCors()
  
  await app.listen(8080);
}
bootstrap();
