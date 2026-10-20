import Link from "next/link";
import { ArcLinkProvider } from "@/components/arc-link-provider";
import { getExperiments } from "@/lib/experiments";
import { site } from "@/lib/site";
import styles from "@/app/lab.module.css";

const github = "https://github.com/YogeshBhusara/lab";

export function Shell({ children }: { children: React.ReactNode }) {
  const count = getExperiments().length;

  return (
    <ArcLinkProvider>
      <div className={styles.shell}>
        <aside className={styles.panel}>
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
        <div className={styles.stage}>{children}</div>
      </div>
    </ArcLinkProvider>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
