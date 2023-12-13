import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as logger from "morgan"
import { ExpressPeerServer } from 'peer';
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.use('/peer-server', cors(),ExpressPeerServer(app.getHttpServer())); /// PeerJS Server 
  app.use(helmet()); //protect against common backend vulnerability
  app.enableCors()
  
  await app.listen(8080);
}
bootstrap();
