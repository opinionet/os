import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { GeohashProximityService } from '../../application/services/geohash-proximity.service';

@Controller('geo-intelligence')
@UseGuards(TenantHeaderGuard)
export class GeoIntelligenceController {
  constructor(private readonly geohashService: GeohashProximityService) {}

  @Get('prefixes')
  getPrefixes(
    @Query('geoHash') geoHash: string,
    @Query('radiusMeters') radiusMetersRaw: string = '1200',
  ): { prefixes: string[]; precision: number } {
    const radiusMeters = Number(radiusMetersRaw);
    if (!Number.isFinite(radiusMeters) || radiusMeters <= 0) {
      throw new BadRequestException('radiusMeters must be a positive number');
    }

    const precision = this.geohashService.selectPrecisionForRadius(radiusMeters);
    return {
      prefixes: this.geohashService.prefixesForRadius(geoHash, radiusMeters),
      precision,
    };
  }
}
