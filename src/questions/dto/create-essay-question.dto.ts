import {
  Equals,
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
  @Equals('essay')
  public type: 'essay';

  @IsNotEmpty()
  @IsString()
  public contentHTML: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EssayAnswerDto)
  public essayAnswers: EssayAnswerDto[];
}
