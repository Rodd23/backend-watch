import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,  } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*', // ou '*' para permitir de todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
