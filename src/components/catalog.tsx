"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { experimentPath } from "@/lib/site";
import { STATUS_LABEL, type Experiment, type ExperimentStatus } from "@/lib/types";

const filters: Array<{ id: "all" | ExperimentStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "prototype", label: "Prototypes" },
  { id: "study", label: "Studies" },
  { id: "native", label: "Native" },
  { id: "sketch", label: "Sketches" },
];

export function Catalog({
  experiments,
  tags,
}: {
  experiments: Experiment[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]["id"]>("all");
  const [tag, setTag] = useState("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return experiments.filter((experiment) => {
      if (status !== "all" && experiment.status !== status) return false;
      if (tag !== "all" && !experiment.tags.includes(tag)) return false;
      if (!needle) return true;
      const haystack = [
        experiment.title,
        experiment.summary,
        experiment.stack.join(" "),
        experiment.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [experiments, query, status, tag]);

  return (
    <section id="index" className="scroll-mt-24">
      <div className="flex flex-col gap-4 border-y border-white/10 py-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#e7ff6a] uppercase">Index</p>
          <h2 className="mt-2 font-serif text-3xl text-[#f4efe4] italic">
            {visible.length} {visible.length === 1 ? "experiment" : "experiments"}
          </h2>
        </div>
        <label className="block w-full lg:max-w-sm">
          <span className="sr-only">Search experiments</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, stack, or note"
            className="h-11 w-full border border-white/15 bg-white/5 px-3 text-sm text-[#f4efe4] outline-none placeholder:text-[#f4efe4]/35 focus:border-[#e7ff6a]"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
          {filters.map((filter) => {
            const active = status === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStatus(filter.id)}
                className={`h-8 px-3 text-xs tracking-wide uppercase ${
                  active
                    ? "bg-[#e7ff6a] text-[#14160f]"
                    : "border border-white/15 text-[#f4efe4]/75 hover:border-white/40"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-2 text-sm text-[#f4efe4]/70">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase">Tag</span>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="h-8 border border-white/15 bg-[#10120f] px-2 text-sm text-[#f4efe4] outline-none"
          >
            <option value="all">All tags</option>
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 border border-dashed border-white/20 px-4 py-10 text-center text-[#f4efe4]/60">
          Nothing matches that filter.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((experiment, index) => (
            <li key={experiment.slug}>
              <Link
                href={experimentPath(experiment.slug)}
                className="group flex h-full flex-col bg-[#f6f1e7] p-5 text-[#1a1714] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase">
                  <span className="text-[#1a1714]/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#6d4a12]">{STATUS_LABEL[experiment.status]}</span>
                </div>
                <h3 className="mt-6 font-serif text-[1.75rem] leading-none tracking-tight italic">
                  {experiment.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#3c3832]">{experiment.summary}</p>
                <p className="mt-5 text-xs tracking-wide text-[#1a1714]/55 uppercase">
                  {experiment.tags.slice(0, 3).join(" · ") || experiment.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
