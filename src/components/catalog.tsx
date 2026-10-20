"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/arc/badge/badge";
import { Button } from "@/components/arc/button/button";
import { Card } from "@/components/arc/card/card";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { SearchField } from "@/components/arc/search-field/search-field";
import SegmentedControl from "@/components/arc/segmented-control/segmented-control";
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

  function clearFilters() {
    setQuery("");
    setStatus("all");
  }

  return (
    <section id="index" className={styles.index}>
      <div className={styles.tools}>
        <SegmentedControl label="Status" value={status} onValueChange={(value) => setStatus(value as typeof status)} options={options} />
        <div className={styles.search}>
          <SearchField label="Search experiments" placeholder="Title, stack, or note" value={query} onValueChange={setQuery} />
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No matches"
          description="Try a shorter search, or clear the status filter."
          action={
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className={styles.grid}>
          {visible.map((experiment) => (
            <li key={experiment.slug}>
              <Link href={experimentPath(experiment.slug)} className={styles.hit}>
                <Card
                  title={experiment.title}
                  description={experiment.summary}
                  meta={experiment.tags.slice(0, 3).join(" · ")}
                >
                  <Badge tone="neutral" size="sm">
                    {STATUS_LABEL[experiment.status]}
                  </Badge>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
