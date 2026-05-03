# CityOS Global Directory Structure (NestJS + DDD, Modular Monolith)

```text
cityos/
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── configuration.ts
│   │   ├── env.validation.ts
│   │   └── kafka.config.ts
│   ├── database/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── common/
│   │   ├── context/                 # request context + tenant propagation
│   │   ├── kafka/                   # kafka producers/consumers abstractions
│   │   ├── websocket/               # shared socket.io contracts + auth hooks
│   │   ├── interceptors/
│   │   ├── filters/
│   │   ├── guards/
│   │   └── decorators/
│   ├── shared/
│   │   ├── dto/
│   │   ├── types/
│   │   ├── constants/
│   │   └── utils/
│   └── modules/
│       ├── auth-tenant-core/
│       │   ├── application/
│       │   │   ├── commands/
│       │   │   ├── queries/
│       │   │   └── services/
│       │   ├── domain/
│       │   │   ├── entities/
│       │   │   ├── events/
│       │   │   ├── repositories/
│       │   │   └── value-objects/
│       │   └── infrastructure/
│       │       ├── persistence/
│       │       ├── controllers/
│       │       ├── gateways/
│       │       └── mappers/
│       ├── iot-system/
│       ├── emergency-dispatch/
│       ├── ai-pipeline/
│       ├── geo-intelligence/
│       ├── city-ops/
│       ├── notifications/
│       ├── audit-governance/
│       ├── billing-subscriptions/
│       └── digital-twin/
└── test/
    ├── unit/
    ├── integration/
    └── e2e/
```

### Architectural notes
- **Multi-tenant isolation** is enforced through tenant context propagation + Prisma middleware per request (`organizationId` scoping).
- **Event-driven boundaries** are modeled as domain events in each module and emitted through shared Kafka producers.
- **Modular monolith now, microservices later**: each module is cleanly split into application/domain/infrastructure to simplify future extraction.
- **Geo-spatial querying** is implemented in `geo-intelligence` through geohash-prefix indexing and repository-level query patterns.
