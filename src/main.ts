import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import pino from 'pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const logger = pino(
    process.env.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
          },
        }
      : {},
  );

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info({
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Obsidian API')
    .setDescription('BackEnd Application Api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3030);

  logger.info('Server Rodando');
}
bootstrap();
