"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ZoomableImage from "./zoomImage/page";
export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.heroCard}>
          <h1 className={styles.title}>Welcome to OpsFlow!</h1>
          <h4 className={styles.subtitle}>A distributed workflow engine</h4>

          <button
            className={styles.buttonTop}
            onClick={() => router.push("/jobs")}
          >
            Get started
          </button>
        </div>
      </div>

      <div className={styles.aboutproject}>
        <div className={styles.heroCard2}>
          <h3>About Poduct</h3>
          <p>
            A lightweight, Redis-backed job orchestration platform for running
            background workflows with retries, scheduling, and distributed
            workers.
          </p>
          <h3>Architecture</h3>
          <ZoomableImage
            src="/img/opsflow-system-architecture.png"
            alt="OpsFlow illustration"
          />

          <h3>Features</h3>
          <p>• Redis-backed job queue (BullMQ)</p>
          <p>• Distributed stateless workers</p>
          <p>• Automatic retries + exponential backoff</p>
          <p>• Step chaining execution engine</p>
          <p>• Persistent execution history & logs</p>
          <p>• Separation of control and execution planes</p>
        </div>
      </div>

      <button
        className={styles.github}
        onClick={() => {
          window.open("https://github.com/harsheetsharma/opsflow");
        }}
      >
        Github
      </button>
    </main>
  );
}
