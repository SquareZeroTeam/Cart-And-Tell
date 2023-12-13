import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as logger from "morgan"
import { ExpressPeerServer } from 'peer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));
  app.use('/peer-server', ExpressPeerServer(app.getHttpServer())); /// PeerJS Server 
  app.use(helmet()); //protect against common backend vulnerability
  app.enableCors({allowedHeaders: ['Access-Control-Allow-Origin']});
  
  await app.listen(8080);
}
bootstrap();
