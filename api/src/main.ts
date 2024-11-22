import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './errors/filters/prisma-exception';
import { HttpExceptionFilter } from './errors/filters/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(
    new PrismaExceptionFilter(),  // Para erros do Prisma
    new HttpExceptionFilter()     // Para erros HTTP gerais
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
