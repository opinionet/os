import { SensorIngestionService } from '../../../src/modules/iot-system/application/services/sensor-ingestion.service';

describe('SensorIngestionService', () => {
  it('persists sensor data and emits SensorDataReceived event', async () => {
    const create = jest.fn().mockResolvedValue(undefined);
    const publish = jest.fn().mockResolvedValue(undefined);

    const service = new SensorIngestionService(
      { sensorData: { create } } as any,
      { organizationId: 'org-abc' } as any,
      { publish } as any,
    );

    const payload = {
      deviceId: 'device-1',
      geoHash: 'dr5ru7k9',
      dataType: 'AIR_QUALITY',
      payload: { pm25: 42 },
    };

    const result = await service.ingest(payload);

    expect(result.status).toBe('accepted');
    expect(create).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledWith(
      'cityos.sensor-data.received',
      expect.objectContaining({
        eventName: 'SensorDataReceived',
        organizationId: 'org-abc',
      }),
    );
  });
});
