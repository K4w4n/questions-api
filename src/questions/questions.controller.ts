import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateAlternativeQuestionDto } from './dto/create-alternative-question.dto';
import { CreateEssayQuestionDto } from './dto/create-essay-question.dto';

@Controller('questions')
export class QuestionsController {

  constructor(private readonly questionsService: QuestionsService) { }

  @Post('')
  createQuestion(@Body() createQuestionDto: CreateAlternativeQuestionDto | CreateEssayQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Post('alternative')
  createAlternativeQuestion(@Body() createQuestionDto: CreateAlternativeQuestionDto) {
    return this.questionsService.createAlternativeQuestion(createQuestionDto);
  }

  @Post('essay')
  createEssayQuestion(@Body() createQuestionDto: CreateEssayQuestionDto) {
    return this.questionsService.createEssayQuestion(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
