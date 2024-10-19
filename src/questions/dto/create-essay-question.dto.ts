import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EssayAnswerDto {
  @IsNotEmpty()
  @IsString()
  contentHTML: string;
}

export class CreateEssayQuestionDto {
  @IsNotEmpty()
  @IsString()
  contentHTML: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EssayAnswerDto)
  essayAnswers: EssayAnswerDto[];
}
