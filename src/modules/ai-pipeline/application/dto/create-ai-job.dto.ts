import { IsObject, IsString, Length } from 'class-validator';

export class CreateAiJobDto {
  @IsString()
  @Length(3, 100)
  modelName!: string;

  @IsObject()
  inputPayload!: Record<string, unknown>;

  @IsString()
  @Length(2, 40)
  targetType!: string;

  @IsString()
  @Length(1, 120)
  targetId!: string;
}
