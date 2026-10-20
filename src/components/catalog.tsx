"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { experimentPath } from "@/lib/site";
import { STATUS_LABEL, type Experiment, type ExperimentStatus } from "@/lib/types";
import styles from "@/app/lab.module.css";

const options: Array<{ value: "all" | ExperimentStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "prototype", label: "Prototype" },
  { value: "study", label: "Study" },
  { value: "native", label: "Native" },
  { value: "sketch", label: "Sketch" },
];

const washes = ["#d7e3f4", "#f3e0d2", "#d7eee3", "#efe0f1", "#f6e6c4", "#d5ebe9", "#e4e2f6", "#f4d8d4"];

function wash(slug: string) {
  let index = 0;
  for (const character of slug) index = (index + character.charCodeAt(0)) % washes.length;
  return washes[index];
}

export function Catalog({ experiments }: { experiments: Experiment[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof options)[number]["value"]>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return experiments.filter((experiment) => {
      if (status !== "all" && experiment.status !== status) return false;
      if (!needle) return true;
      return [experiment.title, experiment.summary, experiment.tags.join(" "), experiment.stack.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [experiments, query, status]);

  return (
    <section className={styles.gallery}>
      <div className={styles.tools}>
        <div className={styles.filters} role="group" aria-label="Status">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.filter}
              data-current={status === option.value ? "" : undefined}
              onClick={() => setStatus(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input
          className={styles.search}
          type="search"
          value={query}
          placeholder="Search"
          aria-label="Search experiments"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p>No matches.</p>
          <button
            type="button"
            className={styles.filter}
            onClick={() => {
              setQuery("");
              setStatus("all");
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <ul className={styles.grid}>
          {visible.map((experiment) => (
            <li key={experiment.slug}>
              <Link href={experimentPath(experiment.slug)} className={styles.tile}>
                <span className={styles.swatch} style={{ background: wash(experiment.slug) }}>
                  {experiment.title}
                </span>
                <span className={styles.tileBody}>
                  <span className={styles.tileSummary}>{experiment.summary}</span>
                  <span className={styles.tileMeta}>
                    {STATUS_LABEL[experiment.status]}
                    {experiment.tags.length > 0 ? ` · ${experiment.tags.slice(0, 2).join(" · ")}` : ""}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
