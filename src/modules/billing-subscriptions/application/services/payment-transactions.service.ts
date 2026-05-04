import { Injectable } from '@nestjs/common';
import { PaymentStatus, PaymentTransaction, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePaymentTransactionDto } from '../dto/create-payment-transaction.dto';

@Injectable()
export class PaymentTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentTransactionDto): Promise<PaymentTransaction> {
    return this.prisma.paymentTransaction.create({
      data: {
        amount: new Prisma.Decimal(dto.amount),
        currency: dto.currency ?? 'USD',
        status: dto.status ?? PaymentStatus.PENDING,
        stripeChargeId: dto.stripeChargeId,
      },
    });
  }

  async listRecent(limit = 100): Promise<PaymentTransaction[]> {
    return this.prisma.paymentTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 500),
    });
  }
}
