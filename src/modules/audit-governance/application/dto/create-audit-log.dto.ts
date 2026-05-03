import { IsOptional, IsString, Length } from 'class-validator';

export class CreateAuditLogDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  @Length(2, 120)
  action!: string;

  @IsString()
  @Length(2, 80)
  entityType!: string;

  @IsString()
  @Length(1, 120)
  entityId!: string;

  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
