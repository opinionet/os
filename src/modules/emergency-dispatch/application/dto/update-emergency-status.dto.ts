import { EmergencyStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateEmergencyStatusDto {
  @IsEnum(EmergencyStatus)
  status!: EmergencyStatus;
}
