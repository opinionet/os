import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role, Subscription } from '@prisma/client';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateSubscriptionDto } from '../../application/dto/create-subscription.dto';
import { SubscriptionsService } from '../../application/services/subscriptions.service';

@Controller('billing/subscriptions')
@UseGuards(TenantHeaderGuard, JwtAuthGuard, RolesGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @Roles(Role.ORG_ADMIN, Role.SUPER_ADMIN)
  async create(@Body() dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(dto);
  }

  @Get('active')
  @Roles(Role.ORG_ADMIN, Role.SUPER_ADMIN, Role.DISPATCHER)
  async getActive(): Promise<Subscription | null> {
    return this.subscriptionsService.getActive();
  }
}
