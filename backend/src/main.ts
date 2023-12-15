import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as logger from "morgan"
import { ExpressPeerServer } from 'peer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); //protect against common backend vulnerability
  app.use(logger('dev'));
  app.enableCors();
  
  app.use('/', ExpressPeerServer(app.getHttpServer())); /// PeerJS Server 
  await app.listen(8080);
}
bootstrap();
