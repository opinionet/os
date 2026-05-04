import { PaymentStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreatePaymentTransactionDto {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  stripeChargeId?: string;
}
