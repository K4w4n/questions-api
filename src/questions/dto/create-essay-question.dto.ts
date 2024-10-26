import {
  Equals,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// TODO: Verificar como essa classe de validação funciona e porque ela não esta funcionando
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


  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  public categoryIds: string[];

  @IsOptional()
  @IsString()
  @IsUUID()
  public examEditionId?: string;
}
