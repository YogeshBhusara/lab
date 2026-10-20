import Link from "next/link";
import { experimentPath } from "@/lib/site";
import type { Experiment } from "@/lib/types";
import styles from "@/app/lab.module.css";

const washes = ["#d7e3f4", "#f3e0d2", "#d7eee3", "#efe0f1", "#f6e6c4", "#d5ebe9", "#e4e2f6", "#f4d8d4"];

function wash(slug: string) {
  let index = 0;
  for (const character of slug) index = (index + character.charCodeAt(0)) % washes.length;
  return washes[index];
}

export function Catalog({ experiments }: { experiments: Experiment[] }) {
  return (
    <section className={styles.gallery}>
      <ul className={styles.grid}>
        {experiments.map((experiment) => (
          <li key={experiment.slug}>
            <Link href={experimentPath(experiment.slug)} className={styles.tile}>
              <span className={styles.swatch} style={{ background: wash(experiment.slug) }}>
                {experiment.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
