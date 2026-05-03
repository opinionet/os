import { Injectable } from '@nestjs/common';
import { SimulationRun } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateSimulationRunDto } from '../dto/create-simulation-run.dto';

@Injectable()
export class SimulationRunsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSimulationRunDto): Promise<SimulationRun> {
    return this.prisma.simulationRun.create({
      data: {
        snapshotId: dto.snapshotId,
        scenarioName: dto.scenarioName,
        parameters: dto.parameters,
        results: dto.results,
      },
    });
  }

  async listBySnapshot(snapshotId: string, limit = 50): Promise<SimulationRun[]> {
    return this.prisma.simulationRun.findMany({
      where: { snapshotId },
      orderBy: { executedAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 500),
    });
  }
}
