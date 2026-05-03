import { Injectable } from '@nestjs/common';
import { TwinSnapshot } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateSnapshotDto } from '../dto/create-snapshot.dto';

@Injectable()
export class TwinSnapshotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSnapshotDto): Promise<TwinSnapshot> {
    return this.prisma.twinSnapshot.create({
      data: {
        version: dto.version,
        stateData: dto.stateData,
      },
    });
  }

  async listRecent(limit = 20): Promise<TwinSnapshot[]> {
    return this.prisma.twinSnapshot.findMany({
      orderBy: { generatedAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 200),
    });
  }
}
