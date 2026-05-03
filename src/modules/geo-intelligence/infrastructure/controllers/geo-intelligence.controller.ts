import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { GeohashProximityService } from '../../application/services/geohash-proximity.service';

@Controller('geo-intelligence')
@UseGuards(TenantHeaderGuard)
export class GeoIntelligenceController {
  constructor(private readonly geohashService: GeohashProximityService) {}

  @Get('prefixes')
  getPrefixes(
    @Query('geoHash') geoHash: string,
    @Query('precision') precision: '5' | '6' | '7' = '6',
  ): { prefixes: string[] } {
    return {
      prefixes: this.geohashService.prefixesForRadius(geoHash, Number(precision) as 5 | 6 | 7),
    };
  }
}
