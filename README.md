# OpsFlow — Self-Hosted Workflow Automation Engine

A lightweight, self-hosted alternative to n8n/Zapier for internal automation.

Built with Redis queues, distributed workers, retries with exponential backoff,
and a fault-tolerant execution engine.

## System Architecture Diagram ( HLD + LLD )

API (Next.js control plane)
↓
Workflow Engine
↓
Redis Queue
↓
Workers (parallel)
↓
Postgres (state + logs)

## Features (engineering focused, NOT UI)

✅ Webhook + manual triggers
✅ Redis-backed job queue (BullMQ)
✅ Distributed worker processes
✅ Automatic retries + exponential backoff
✅ Step chaining
✅ Persistent execution history
✅ Dockerized infra (Postgres + Redis)
✅ Idempotent job design

## Quick start

```
cd docker && docker compose up && cd ..
pnpm --filter @opsflow/worker dev
pnpm --filter @opsflow/api dev

```

## “Why this project?”

Most portfolio projects are CRUD apps.
OpsFlow focuses on backend infrastructure problems:

- job scheduling
- distributed workers
- failure handling
- retries
- observability
