import { IsOptional, IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId!: string;

  @IsString()
  @Length(1, 160)
  title!: string;

  @IsString()
  @Length(1, 2000)
  message!: string;

  @IsOptional()
  @IsString()
  actionUrl?: string;
}
