import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateSubscriptionDto } from '../../application/dto/create-subscription.dto';
import { SubscriptionsService } from '../../application/services/subscriptions.service';

@Controller('billing/subscriptions')
@UseGuards(TenantHeaderGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(dto);
  }

  @Get('active')
  async getActive(): Promise<Subscription | null> {
    return this.subscriptionsService.getActive();
  }
}
