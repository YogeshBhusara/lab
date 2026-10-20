"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/lib/site";
import styles from "@/app/lab.module.css";

const github = "https://github.com/YogeshBhusara/lab";

export function ShellFrame({ count, children }: { count: number; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const open = pathname.startsWith("/experiments/");

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, router]);

  return (
    <div className={styles.shell} data-open={open ? "" : undefined}>
      <aside className={styles.panel} inert={open ? true : undefined}>
        <div className={styles.board}>
          <Link className={styles.mark} href="/">
            Lab
          </Link>
          <p className={styles.byline}>
            <span className={styles.star} aria-hidden="true">
              *
            </span>
            {site.author}
          </p>
          <p className={styles.headline}>A shelf for experiments you can open and share</p>
          <p className={styles.intro}>
            Prototypes, studies, and native apps. Each page has the note, the stack, and a link you can send.
          </p>
          <a className={styles.call} href={github} target="_blank" rel="noreferrer">
            GitHub
            <Arrow />
          </a>
          <div className={styles.sheet}>
            <p className={styles.label}>Experiments</p>
            <p className={styles.value}>{count}</p>
            <p className={styles.label}>GitHub</p>
            <a className={styles.value} href={github} target="_blank" rel="noreferrer">
              YogeshBhusara/lab
            </a>
          </div>
        </div>
      </aside>
      <div className={styles.stage}>
        <div className={styles.stageInner} key={open ? "note" : "grid"}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
