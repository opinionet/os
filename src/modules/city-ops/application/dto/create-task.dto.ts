import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3, 180)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  assigneeId?: string;

  @IsOptional()
  @IsString()
  geoNodeId?: string;
}
