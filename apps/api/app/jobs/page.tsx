"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

type Execution = {
  id: string;
  workflowId: string;
  status: "SUCCESS" | "FAILED" | "RUNNING";
  startedAt: string;
  finishedAt: string | null;
  jobs: Job[];
};

type Job = {
  id: string;
  stepkey: string;
  status: "SUCCESS" | "FAILED" | "ACTIVE" | "RETRYING";
  attempts: number;
  output: any;
  error: string | null;
};

export default function Home() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/executions");
    setExecutions(await res.json());
  }

  async function trigger() {
    setLoading(true);
    await fetch("/api/workflows", {
      method: "POST",
      body: JSON.stringify({
        name: "demolition",
        steps: [
          {
            key: "test",
            type: "http",
            config: {
              url: "https://jsonplaceholder.typicode.com/todos/1",
            },
          },
        ],
      }),
    });
    await load();
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>OpsFlow</h1>
          <p>Workflow executions & distributed job state</p>
        </div>

        <button className={styles.button} onClick={trigger} disabled={loading}>
          {loading ? "Running…" : "Run workflow"}
        </button>
      </header>

      <section className={styles.list}>
        {executions.map((exec) => (
          <div key={exec.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.execId}>{exec.id.slice(0, 12)}</span>
                <span className={styles.workflow}>
                  wf:{exec.workflowId.slice(0, 8)}
                </span>
              </div>

              <span className={`${styles.status} ${styles[exec.status]}`}>
                {exec.status}
              </span>
            </div>

            <div className={styles.meta}>
              <span>Started: {new Date(exec.startedAt).toLocaleString()}</span>
              <span>
                Finished:{" "}
                {exec.finishedAt
                  ? new Date(exec.finishedAt).toLocaleString()
                  : "—"}
              </span>
            </div>

            <div className={styles.jobs}>
              {exec.jobs.length === 0 && (
                <span className={styles.empty}>No jobs started yet</span>
              )}

              {exec.jobs.map((job) => (
                <div
                  key={job.id}
                  className={`${styles.job} ${styles[job.status]}`}
                >
                  <div className={styles.jobTop}>
                    <span>{job.stepkey}</span>
                    <span className={styles.jobStatus}>{job.status}</span>
                  </div>

                  <div className={styles.jobMeta}>attempts: {job.attempts}</div>

                  {job.error && <pre className={styles.error}>{job.error}</pre>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
