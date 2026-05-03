import { EventType } from '@prisma/client';
import { IsEnum, IsObject, IsString, Length } from 'class-validator';

export class CreateCityEventDto {
  @IsEnum(EventType)
  type!: EventType;

  @IsString()
  @Length(2, 80)
  sourceName!: string;

  @IsObject()
  payload!: Record<string, unknown>;
}
