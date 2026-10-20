import fs from "node:fs";
import path from "node:path";
import { STATUSES, type Experiment, type ExperimentStatus } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "experiments");

function unquote(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseExperiment(slug: string, raw: string): Experiment {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Experiment "${slug}" is missing front matter.`);
  }

  const data: Record<string, string> = {};
  const links: Experiment["links"] = [];

  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      throw new Error(`Experiment "${slug}" has a bad front matter line: ${trimmed}`);
    }
    const key = trimmed.slice(0, separator).trim();
    const value = unquote(trimmed.slice(separator + 1).trim());
    if (key === "link") {
      const [label, href] = value.split("|").map((part) => part.trim());
      if (!label || !href) {
        throw new Error(`Experiment "${slug}" has a link without a label and URL.`);
      }
      links.push({ label, href });
      continue;
    }
    data[key] = value;
  }

  const status = data.status as ExperimentStatus;
  if (!STATUSES.includes(status)) {
    throw new Error(
      `Experiment "${slug}" has status "${data.status}". Use one of: ${STATUSES.join(", ")}.`,
    );
  }

  if (!data.title || !data.summary) {
    throw new Error(`Experiment "${slug}" needs a title and a summary.`);
  }

  return {
    slug,
    title: data.title,
    summary: data.summary,
    status,
    year: data.year ?? "",
    tags: splitList(data.tags ?? ""),
    stack: splitList(data.stack ?? ""),
    links,
    featured: data.featured === "true",
    visual: data.visual === "true",
    body: match[2].trim(),
  };
}

export function getExperiments(): Experiment[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      return parseExperiment(slug, raw);
    })
    .filter((experiment) => experiment.visual)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
}

export function getExperiment(slug: string) {
  return getExperiments().find((experiment) => experiment.slug === slug);
}

export function getTags(experiments: Experiment[]) {
  return [...new Set(experiments.flatMap((experiment) => experiment.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}
