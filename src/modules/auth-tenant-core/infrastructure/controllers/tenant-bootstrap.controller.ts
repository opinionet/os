import { Body, Controller, Post } from '@nestjs/common';
import { BootstrapOrganizationDto } from '../../application/dto/bootstrap-organization.dto';
import { TenantBootstrapService } from '../../application/services/tenant-bootstrap.service';

@Controller('tenant/bootstrap')
export class TenantBootstrapController {
  constructor(private readonly tenantBootstrap: TenantBootstrapService) {}

  @Post()
  async bootstrap(@Body() dto: BootstrapOrganizationDto): Promise<{ organizationId: string; adminUserId: string }> {
    return this.tenantBootstrap.bootstrap(dto);
  }
}
