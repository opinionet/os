# CityOS Backend (WIP)

## Run infrastructure
```bash
docker compose up -d
```

## Environment
Copy `.env.example` to `.env`.

## Current implemented slices
- Tenant context propagation (`x-organization-id`, `x-request-id`)
- Prisma tenant-scoping middleware
- Kafka publisher abstraction
- Geo-intelligence prefix endpoint
- IoT sensor data ingestion + event emit
- Emergency creation + event emit

## API endpoints
- `GET /api/v1/tenant/health`
- `GET /api/v1/geo-intelligence/prefixes?geoHash=dr5ru7k9&radiusMeters=1000`
- `POST /api/v1/iot/sensor-data`
- `POST /api/v1/emergencies`

All endpoints currently require `x-organization-id` header except bootstrap actions that may be added later.
