import { Injectable } from '@nestjs/common';
import { CityEvent } from '@prisma/client';
import { CityEventsGateway } from '../../../../common/websocket/city-events.gateway';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCityEventDto } from '../dto/create-city-event.dto';

@Injectable()
export class CityEventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cityEventsGateway: CityEventsGateway,
  ) {}

  async create(dto: CreateCityEventDto): Promise<CityEvent> {
    const event = await this.prisma.cityEvent.create({
      data: {
        type: dto.type,
        sourceName: dto.sourceName,
        payload: dto.payload,
      },
    });

    this.cityEventsGateway.broadcastEvent({
      id: event.id,
      type: event.type,
      sourceName: event.sourceName,
      payload: event.payload,
      timestamp: event.timestamp,
    });

    return event;
  }

  async listRecent(limit = 100): Promise<CityEvent[]> {
    return this.prisma.cityEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: Math.min(Math.max(limit, 1), 500),
    });
  }
}
