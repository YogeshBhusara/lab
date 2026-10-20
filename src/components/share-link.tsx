"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/arc/copy-button/copy-button";
import styles from "@/app/lab.module.css";

export function ShareLink({ path }: { path: string }) {
  const [url, setUrl] = useState(path);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  return (
    <div className={styles.row}>
      <CopyButton value={url} label="Copy share link" />
      <p className={styles.url}>{url}</p>
    </div>
  );
}
