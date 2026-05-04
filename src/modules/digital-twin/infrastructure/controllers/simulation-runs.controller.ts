import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SimulationRun } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateSimulationRunDto } from '../../application/dto/create-simulation-run.dto';
import { SimulationRunsService } from '../../application/services/simulation-runs.service';

@Controller('digital-twin/simulations')
@UseGuards(TenantHeaderGuard)
export class SimulationRunsController {
  constructor(private readonly simulationRunsService: SimulationRunsService) {}

  @Post()
  async create(@Body() dto: CreateSimulationRunDto): Promise<SimulationRun> {
    return this.simulationRunsService.create(dto);
  }

  @Get(':snapshotId')
  async listBySnapshot(
    @Param('snapshotId') snapshotId: string,
    @Query('limit') limitRaw = '50',
  ): Promise<SimulationRun[]> {
    return this.simulationRunsService.listBySnapshot(snapshotId, Number(limitRaw));
  }
}
