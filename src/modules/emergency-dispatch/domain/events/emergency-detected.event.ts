import { EmergencySeverity } from '@prisma/client';

export interface EmergencyDetectedEventPayload {
  emergencyId: string;
  title: string;
  severity: EmergencySeverity;
  geoNodeId: string;
  detectedById?: string;
}
