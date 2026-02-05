# OpsFlow — Self-Hosted Workflow Automation Engine

A lightweight, self-hosted alternative to n8n/Zapier for internal automation.

Built with Redis queues, distributed workers, retries with exponential backoff,
and a fault-tolerant execution engine.

---

## 🚀 Overview

**OpsFlow** is a backend-first workflow automation engine designed to solve
real infrastructure problems such as:

- job orchestration
- distributed execution
- retries and backoff
- state persistence
- observability

This project intentionally avoids UI complexity and focuses on **systems engineering**.

---

## System Architecture
### Low-Level Design (LLD)
<img width="1745" height="788" alt="Screenshot 2026-02-04 182451" src="https://github.com/user-attachments/assets/eb9d761c-4160-4804-ac17-fadc526942a7" />

### High-Level Design (HLD)

- **API (Next.js Control Plane)**
  - Triggers workflow execution
- **Workflow Engine**
  - Resolves steps and dependencies
- **Redis Queue (BullMQ)**
  - Buffers jobs and retries
- **Distributed Workers**
  - Execute jobs in parallel
- **Postgres**
  - Persists state and logs
---

## ⚙️ Core Components

- **API (Control Plane)**
  - Workflow creation
  - Trigger management
  - Execution inspection

- **Workflow Engine**
  - Step chaining
  - Dependency resolution
  - Execution state tracking

- **Redis Queue (BullMQ)**
  - Job buffering
  - Retry scheduling
  - Backoff management

- **Workers**
  - Horizontally scalable
  - Stateless execution
  - Idempotent job handling

- **Postgres**
  - Execution history
  - Logs
  - Workflow metadata

---

## Features (engineering focused, NOT UI)

- ✅ Webhook + manual triggers
- ✅ Redis-backed job queue (BullMQ)
- ✅ Distributed worker processes
- ✅ Automatic retries + exponential backoff
- ✅ Step chaining
- ✅ Persistent execution history
- ✅ Dockerized infra (Postgres + Redis)
- ✅ Idempotent job design

---

## 🧪 Engineering Focus

This project prioritizes **backend infrastructure challenges**, including:

- job scheduling
- distributed systems
- failure handling
- retry strategies
- observability
- system resilience

---

## Quick start

```
cd docker
docker compose up

cd ..
pnpm --filter @opsflow/worker dev
pnpm --filter @opsflow/api dev

```

## “Why this project?”

Most portfolio projects are CRUD apps.
OpsFlow focuses on backend infrastructure problems:

- OpsFlow demonstrates hands-on experience with:
  - real-world async workloads
  - distributed execution models
  - production-grade reliability patterns
  - Built to scale — and to break — so it can be fixed properly.
