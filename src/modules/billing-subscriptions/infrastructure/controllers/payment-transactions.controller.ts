import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PaymentTransaction } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreatePaymentTransactionDto } from '../../application/dto/create-payment-transaction.dto';
import { PaymentTransactionsService } from '../../application/services/payment-transactions.service';

@Controller('billing/payments')
@UseGuards(TenantHeaderGuard)
export class PaymentTransactionsController {
  constructor(private readonly paymentTransactionsService: PaymentTransactionsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentTransactionDto): Promise<PaymentTransaction> {
    return this.paymentTransactionsService.create(dto);
  }

  @Get()
  async listRecent(@Query('limit') limitRaw = '100'): Promise<PaymentTransaction[]> {
    return this.paymentTransactionsService.listRecent(Number(limitRaw));
  }
}
