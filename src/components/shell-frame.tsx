"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import styles from "@/app/lab.module.css";

const github = "https://github.com/YogeshBhusara/lab";
const motionMs = 520;

export function ShellFrame({ count, children }: { count: number; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const open = pathname.startsWith("/experiments/");
  const [shown, setShown] = useState(children);
  const [shownOpen, setShownOpen] = useState(open);
  const [outgoing, setOutgoing] = useState<ReactNode>(null);

  if (open !== shownOpen) {
    setShownOpen(open);
    setOutgoing(shown);
    setShown(children);
  } else if (shown !== children) {
    setShown(children);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, router]);

  useEffect(() => {
    if (outgoing == null) return;
    const id = window.setTimeout(() => setOutgoing(null), motionMs);
    return () => window.clearTimeout(id);
  }, [outgoing]);

  const motion = open ? "open" : "close";

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
        {outgoing != null ? (
          <div className={styles.stageLayer} data-leaving="" data-motion={motion} inert>
            {outgoing}
          </div>
        ) : null}
        <div
          className={styles.stageLayer}
          data-entering={outgoing != null ? "" : undefined}
          data-motion={motion}
        >
          {shown}
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
