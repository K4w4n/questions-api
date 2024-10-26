import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    const question = {
      id: uuidv7(),
      type: 'alternative',
      contentHTML: sanitizeHtml(data.contentHTML),
      examEditionId: data.examEditionId,
    }

    const alternatives = data.alternatives.map((alt) => ({
      id: uuidv7(),
      questionId: question.id,
      contentHTML: sanitizeHtml(alt.contentHTML),
      isCorrect: alt.isCorrect,
    }));

    const [{ categoryCount }] = await this.knex('categories')
      .whereIn('id', data.categoryIds)
      .count('id as categoryCount');

    if (categoryCount !== data.categoryIds.length) throw new BadRequestException('Invalid category');

    if (data.examEditionId) {
      const examEdition = await this.knex('exam_editions')
        .where({ id: data.examEditionId })
        .first()

      if (!examEdition) throw new BadRequestException('Invalid Exam edition')
    }


    await this.knex.transaction(async (transaction) => {

      await transaction('questions').insert(question);

      await transaction('alternatives').insert(alternatives);

      if (data.categoryIds.length > 0) {
        await transaction('categories').insert(data.categoryIds.map(categoryId => ({
          id: uuidv7(),
          questionId: question.id,
          categoryId: categoryId,
        })));
      }
    });

    return question;

  }

  async createEssayQuestion(data: CreateEssayQuestionDto) {

    await validateOrReject(data);

    const question = {
      id: uuidv7(),
      type: 'essay',
      contentHTML: sanitizeHtml(data.contentHTML),
      examEditionId: data.examEditionId,
    }

    const essayAnswers = data.essayAnswers.map((answers) => ({
      id: uuidv7(),
      questionId: question.id,
      contentHTML: sanitizeHtml(answers.contentHTML),
    }));

    const [{ categoryCount }] = await this.knex('categories')
      .whereIn('id', data.categoryIds)
      .count('id as categoryCount');

    if (categoryCount !== data.categoryIds.length) throw new BadRequestException('Invalid category');

    if (data.examEditionId) {
      const examEdition = await this.knex('exam_editions')
        .where({ id: data.examEditionId })
        .first()

      if (!examEdition) throw new BadRequestException('Invalid Exam edition')
    }

    this.knex.transaction(async(transaction) => {


      await transaction('questions').insert(question);

      await transaction('essay_answers').insert(essayAnswers);

      if (data.categoryIds.length > 0) {
        await transaction('categories').insert(data.categoryIds.map(categoryId => ({
          id: uuidv7(),
          questionId: question.id,
          categoryId: categoryId,
        })));
      }
    });

    return question;
  }

  async createQuestion(data: CreateAlternativeQuestionDto | CreateEssayQuestionDto) {

    if (data.type === 'alternative') return await this.createAlternativeQuestion(data);

    if (data.type === 'essay') return await this.createEssayQuestion(data);

    throw new NotFoundException('Invalid question type');

  }

  async findOne(id: string) {

    const question = await this.knex('questions').where({ id }).first();

    if (!question) throw new NotFoundException('Question not found');

    if (question.type === 'alternative') question.alternatives = await this.knex('alternatives').where({ questionId: id });
    else if (question.type === 'essay') question.essayAnswers = await this.knex('essay_answers').where({ questionId: id });

    return question;
  }

  async remove(id: string) {
    return this.knex('questions').where({ id }).delete();
  }
}
