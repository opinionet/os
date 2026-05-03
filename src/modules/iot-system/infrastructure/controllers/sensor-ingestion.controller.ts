import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { IngestSensorDataDto } from '../../application/dto/ingest-sensor-data.dto';
import { SensorIngestionService } from '../../application/services/sensor-ingestion.service';

@Controller('iot')
@UseGuards(TenantHeaderGuard)
export class SensorIngestionController {
  constructor(private readonly ingestionService: SensorIngestionService) {}

  @Post('sensor-data')
  async ingest(@Body() dto: IngestSensorDataDto): Promise<{ status: 'accepted'; timestamp: string }> {
    return this.ingestionService.ingest(dto);
  }
}
