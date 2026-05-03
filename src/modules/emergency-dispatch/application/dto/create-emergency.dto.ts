import { EmergencySeverity } from '@prisma/client';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateEmergencyDto {
  @IsString()
  @Length(3, 120)
  title!: string;

  @IsEnum(EmergencySeverity)
  severity!: EmergencySeverity;

  @IsString()
  geoNodeId!: string;

  @IsOptional()
  @IsString()
  detectedById?: string;
}
