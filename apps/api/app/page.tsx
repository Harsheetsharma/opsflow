"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.container2}>
      <div className={styles.heroCard}>
        <h1 className={styles.title}>Welcome to OpsFlow</h1>
        <h4 className={styles.subtitle}>A distributed workflow engine</h4>

        <button
          className={styles.buttonTop}
          onClick={() => router.push("/jobs")}
        >
          Get started
        </button>
      </div>
    </main>
  );
}
