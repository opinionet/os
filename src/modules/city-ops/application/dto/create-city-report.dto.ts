import { ReportStatus } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateCityReportDto {
  @IsString()
  @Length(3, 180)
  title!: string;

  @IsString()
  @Length(5, 5000)
  description!: string;

  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @IsOptional()
  @IsString()
  reporterId?: string;

  @IsOptional()
  @IsString()
  geoNodeId?: string;

  @IsOptional()
  @IsArray()
  mediaUrls?: string[];
}
