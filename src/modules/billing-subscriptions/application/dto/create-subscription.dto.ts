import { SubscriptionTier } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsEnum(SubscriptionTier)
  tier!: SubscriptionTier;

  @IsOptional()
  @IsString()
  stripeSubId?: string;
}
