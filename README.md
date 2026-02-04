# OpsFlow — Self-Hosted Workflow Automation Engine

A lightweight, self-hosted alternative to n8n/Zapier for internal automation.

Built with Redis queues, distributed workers, retries with exponential backoff,
and a fault-tolerant execution engine.

## System Architecture Diagram ( HLD + LLD )

<img width="1745" height="788" alt="Screenshot 2026-02-04 182451" src="https://github.com/user-attachments/assets/eb9d761c-4160-4804-ac17-fadc526942a7" />

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
