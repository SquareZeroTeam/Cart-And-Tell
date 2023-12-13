import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as logger from "morgan"
import { ExpressPeerServer } from 'peer';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS using the cors middleware
  app.use(
    cors({
      origin: '*', // Replace with your frontend origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );
  app.use(logger('dev'));
  app.use(
    ExpressPeerServer(app.getHttpServer())
  );
  app.use(helmet()); //protect against common backend vulnerability
  app.enableCors()
  
  await app.listen(8080);
}
bootstrap();
