import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CityReport, ReportStatus } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateCityReportDto } from '../../application/dto/create-city-report.dto';
import { CityReportsService } from '../../application/services/city-reports.service';

@Controller('city-reports')
@UseGuards(TenantHeaderGuard)
export class CityReportsController {
  constructor(private readonly cityReportsService: CityReportsService) {}

  @Post()
  async create(@Body() dto: CreateCityReportDto): Promise<CityReport> {
    return this.cityReportsService.create(dto);
  }

  @Get()
  async listByStatus(@Query('status') status?: ReportStatus): Promise<CityReport[]> {
    return this.cityReportsService.listByStatus(status);
  }
}
