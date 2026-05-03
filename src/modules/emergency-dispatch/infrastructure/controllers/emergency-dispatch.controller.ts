import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Emergency } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateEmergencyDto } from '../../application/dto/create-emergency.dto';
import { EmergencyDispatchService } from '../../application/services/emergency-dispatch.service';

@Controller('emergencies')
@UseGuards(TenantHeaderGuard)
export class EmergencyDispatchController {
  constructor(private readonly emergencyService: EmergencyDispatchService) {}

  @Post()
  async create(@Body() dto: CreateEmergencyDto): Promise<Emergency> {
    return this.emergencyService.createEmergency(dto);
  }
}
