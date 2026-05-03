import { Injectable } from '@nestjs/common';

const EARTH_COVERAGE_BY_PRECISION_METERS: Record<number, number> = {
  1: 5000000,
  2: 1250000,
  3: 156000,
  4: 39100,
  5: 4890,
  6: 1220,
  7: 153,
  8: 38,
};

@Injectable()
export class GeohashProximityService {
  selectPrecisionForRadius(radiusMeters: number): number {
    const entries = Object.entries(EARTH_COVERAGE_BY_PRECISION_METERS)
      .map(([precision, cellSize]) => ({ precision: Number(precision), cellSize }))
      .sort((a, b) => a.precision - b.precision);

    for (const entry of entries) {
      if (radiusMeters >= entry.cellSize) {
        return entry.precision;
      }
    }

    return 8;
  }

  prefixesForRadius(geoHash: string, radiusMeters: number): string[] {
    const trimmedGeoHash = geoHash.trim();
    if (!trimmedGeoHash) {
      return [];
    }

    const precision = Math.min(trimmedGeoHash.length, this.selectPrecisionForRadius(radiusMeters));
    return [trimmedGeoHash.slice(0, precision)];
  }
}
