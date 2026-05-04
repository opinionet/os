import { IsObject, IsOptional, IsString, Length } from 'class-validator';

export class IngestSensorDataDto {
  @IsString()
  @Length(1, 100)
  deviceId!: string;

  @IsString()
  @Length(4, 12)
  geoHash!: string;

  @IsString()
  @Length(1, 50)
  dataType!: string;

  @IsObject()
  payload!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  timestamp?: string;
}
