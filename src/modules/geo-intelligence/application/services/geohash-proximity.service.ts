import { Injectable } from '@nestjs/common';

@Injectable()
export class GeohashProximityService {
  prefixesForRadius(geoHash: string, precision: 5 | 6 | 7): string[] {
    if (geoHash.length < precision) {
      return [geoHash];
    }

    const prefix = geoHash.slice(0, precision);
    return [prefix];
  }
}
