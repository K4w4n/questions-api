import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';

class AlternativeDto {
  @IsNotEmpty()
  @IsString()
  contentHTML: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}

@ValidatorConstraint({ name: 'minTwoAlternatives', async: false })
class MinTwoAlternativesConstraint implements ValidatorConstraintInterface {
  validate(alternatives: AlternativeDto[], args: ValidationArguments) {
    return Array.isArray(alternatives) && alternatives.length >= 2;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Deve haver pelo menos duas alternativas.';
  }
}

@ValidatorConstraint({ name: 'oneCorrectAlternative', async: false })
class OneCorrectAlternativeConstraint implements ValidatorConstraintInterface {
  validate(alternatives: AlternativeDto[], args: ValidationArguments) {
    if (!Array.isArray(alternatives)) return false;
    const correctCount = alternatives.filter((alt) => alt.isCorrect).length;
    return correctCount === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Deve haver exatamente uma alternativa correta.';
  }
}

export class CreateAlternativeQuestionDto {
  @IsNotEmpty()
  @IsString()
  contentHTML: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlternativeDto)
  @Validate(MinTwoAlternativesConstraint)
  @Validate(OneCorrectAlternativeConstraint)
  alternatives: AlternativeDto[];
}
