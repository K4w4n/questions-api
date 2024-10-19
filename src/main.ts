import { NestFactory } from '@nestjs/core';
import { QuestionsModule } from './questions/questions.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(QuestionsModule);
  app.useGlobalPipes(new ValidationPipe()); // Ativa a validação global
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
