import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrganizationId } from '../../../../common/decorators/organization-id.decorator';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';

@Controller('tenant')
@UseGuards(TenantHeaderGuard)
export class TenantHealthController {
  @Get('health')
  getHealth(@OrganizationId() organizationId: string): { status: string; organizationId: string } {
    return {
      status: 'ok',
      organizationId,
    };
  }
}
