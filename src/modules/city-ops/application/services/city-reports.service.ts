import { Injectable } from '@nestjs/common';
import { CityReport, ReportStatus } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCityReportDto } from '../dto/create-city-report.dto';

@Injectable()
export class CityReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCityReportDto): Promise<CityReport> {
    return this.prisma.cityReport.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status ?? ReportStatus.OPEN,
        reporterId: dto.reporterId,
        geoNodeId: dto.geoNodeId,
        mediaUrls: dto.mediaUrls ?? [],
      },
    });
  }

  async listByStatus(status?: ReportStatus): Promise<CityReport[]> {
    return this.prisma.cityReport.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }
}
