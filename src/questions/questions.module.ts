import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { knexProviders } from '../knex.provider';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, ...knexProviders],
})

export class QuestionsModule {}
