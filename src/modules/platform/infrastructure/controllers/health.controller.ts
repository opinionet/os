import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../../application/services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  liveness(): { status: 'ok'; service: string } {
    return this.healthService.liveness();
  }

  @Get('ready')
  async readiness(): Promise<{ status: 'ok'; checks: { database: 'ok' } }> {
    return this.healthService.readiness();
  }
}
