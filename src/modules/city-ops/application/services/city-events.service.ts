import { Injectable } from '@nestjs/common';
import { CityEvent } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCityEventDto } from '../dto/create-city-event.dto';

@Injectable()
export class CityEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCityEventDto): Promise<CityEvent> {
    return this.prisma.cityEvent.create({
      data: {
        type: dto.type,
        sourceName: dto.sourceName,
        payload: dto.payload,
      },
    });
  }

  async listRecent(limit = 100): Promise<CityEvent[]> {
    return this.prisma.cityEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: Math.min(Math.max(limit, 1), 500),
    });
  }
}
