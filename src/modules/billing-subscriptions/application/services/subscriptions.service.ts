import { Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.prisma.subscription.create({
      data: {
        tier: dto.tier,
        stripeSubId: dto.stripeSubId,
      },
    });
  }

  async getActive(): Promise<Subscription | null> {
    return this.prisma.subscription.findFirst({
      where: { isActive: true },
      orderBy: { startDate: 'desc' },
    });
  }
}
