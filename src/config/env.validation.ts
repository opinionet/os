import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  KAFKA_CLIENT_ID: z.string().min(1).default('cityos-app'),
  KAFKA_BROKERS: z.string().min(1).default('localhost:9092'),
  KAFKA_GROUP_ID: z.string().min(1).default('cityos-consumer'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  return envSchema.parse(config);
}
