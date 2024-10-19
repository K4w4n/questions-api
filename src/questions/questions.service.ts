import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KNEX_CONNECTION } from 'src/knex.provider';
import { Knex } from 'knex';
import { CreateAlternativeQuestionDto } from './dto/create-alternative-question.dto';
import { CreateEssayQuestionDto } from './dto/create-essay-question.dto';
import { uuidv7 } from "uuidv7";
import * as sanitizeHtml from 'sanitize-html';
import { validateOrReject } from 'class-validator';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly knex: Knex,
  ) { }

  async findAll() {
    return this.knex('questions').select('*');
  }

  async createAlternativeQuestion(data: CreateAlternativeQuestionDto) {

    await validateOrReject(data);

    console.log(data);

    const question = {
      id: uuidv7(),
      type: 'alternative',
      contentHTML: sanitizeHtml(data.contentHTML),
    }

    const alternatives = data.alternatives.map((alt) => ({
      id: uuidv7(),
      questionId: question.id,
      contentHTML: sanitizeHtml(alt.contentHTML),
      isCorrect: alt.isCorrect,
    }));

    const result = await this.knex('questions').insert(question);

    await this.knex('alternatives').insert(alternatives);
    return result;

  }

  async createEssayQuestion(data: CreateEssayQuestionDto) {

    await validateOrReject(data);

    const question = {
      id: uuidv7(),
      type: 'essay',
      contentHTML: sanitizeHtml(data.contentHTML),
    }

    const essayAnswers = data.essayAnswers.map((answers) => ({
      id: uuidv7(),
      questionId: question.id,
      contentHTML: sanitizeHtml(answers.contentHTML),
    }));

    const result = await this.knex('questions').insert(question);

    await this.knex('essay_answers').insert(essayAnswers);
    return result;
  }

  async findOne(id: string) {

    const question = await this.knex('questions').where({ id }).first();

    if (question.type === 'alternative') question.alternatives = await this.knex('alternatives').where({ questionId: id });
    else if (question.type === 'essay') question.essayAnswers = await this.knex('essay_answers').where({ questionId: id });

    return question;
  }

  async remove(id: string) {
    return this.knex('questions').where({ id }).delete();
  }
}
