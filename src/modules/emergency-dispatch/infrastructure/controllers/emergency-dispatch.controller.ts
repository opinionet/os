import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Emergency } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateEmergencyDto } from '../../application/dto/create-emergency.dto';
import { UpdateEmergencyStatusDto } from '../../application/dto/update-emergency-status.dto';
import { EmergencyDispatchService } from '../../application/services/emergency-dispatch.service';

@Controller('emergencies')
@UseGuards(TenantHeaderGuard)
export class EmergencyDispatchController {
  constructor(private readonly emergencyService: EmergencyDispatchService) {}

  @Post()
  async create(@Body() dto: CreateEmergencyDto): Promise<Emergency> {
    return this.emergencyService.createEmergency(dto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateEmergencyStatusDto): Promise<Emergency> {
    return this.emergencyService.updateStatus(id, dto);
  }
}
