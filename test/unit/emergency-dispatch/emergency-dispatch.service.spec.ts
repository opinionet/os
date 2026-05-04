import { EmergencyStatus } from '@prisma/client';
import { EmergencyDispatchService } from '../../../src/modules/emergency-dispatch/application/services/emergency-dispatch.service';

describe('EmergencyDispatchService', () => {
  it('updates emergency status and emits event', async () => {
    const update = jest.fn().mockResolvedValue({ id: 'e1', status: EmergencyStatus.RESOLVED });
    const publish = jest.fn().mockResolvedValue(undefined);

    const service = new EmergencyDispatchService(
      { emergency: { create: jest.fn(), update } } as any,
      { organizationId: 'org1' } as any,
      { publish } as any,
    );

    const result = await service.updateStatus('e1', { status: EmergencyStatus.RESOLVED });
    expect(result.status).toBe(EmergencyStatus.RESOLVED);
    expect(publish).toHaveBeenCalledWith(
      'cityos.emergency.status-updated',
      expect.objectContaining({ eventName: 'EmergencyStatusUpdated' }),
    );
  });
});
