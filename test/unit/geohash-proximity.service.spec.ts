import { GeohashProximityService } from '../../src/modules/geo-intelligence/application/services/geohash-proximity.service';

describe('GeohashProximityService', () => {
  const service = new GeohashProximityService();

  it('returns an empty list for blank geohash', () => {
    expect(service.prefixesForRadius('   ', 500)).toEqual([]);
  });

  it('returns a deterministic prefix for given radius', () => {
    expect(service.prefixesForRadius('dr5ru7k9', 1000)).toEqual(['dr5ru']);
  });

  it('selects higher precision for smaller radius', () => {
    const largeRadiusPrecision = service.selectPrecisionForRadius(5000);
    const smallRadiusPrecision = service.selectPrecisionForRadius(200);

    expect(smallRadiusPrecision).toBeGreaterThan(largeRadiusPrecision);
  });
});
