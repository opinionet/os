import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CityEvent } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateCityEventDto } from '../../application/dto/create-city-event.dto';
import { CityEventsService } from '../../application/services/city-events.service';

@Controller('city-events')
@UseGuards(TenantHeaderGuard)
export class CityEventsController {
  constructor(private readonly cityEventsService: CityEventsService) {}

  @Post()
  async create(@Body() dto: CreateCityEventDto): Promise<CityEvent> {
    return this.cityEventsService.create(dto);
  }

  @Get()
  async listRecent(@Query('limit') limitRaw = '100'): Promise<CityEvent[]> {
    return this.cityEventsService.listRecent(Number(limitRaw));
  }
}
