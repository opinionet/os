import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TwinSnapshot } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateSnapshotDto } from '../../application/dto/create-snapshot.dto';
import { TwinSnapshotsService } from '../../application/services/twin-snapshots.service';

@Controller('digital-twin/snapshots')
@UseGuards(TenantHeaderGuard)
export class TwinSnapshotsController {
  constructor(private readonly snapshotsService: TwinSnapshotsService) {}

  @Post()
  async create(@Body() dto: CreateSnapshotDto): Promise<TwinSnapshot> {
    return this.snapshotsService.create(dto);
  }

  @Get()
  async listRecent(@Query('limit') limitRaw = '20'): Promise<TwinSnapshot[]> {
    return this.snapshotsService.listRecent(Number(limitRaw));
  }
}
