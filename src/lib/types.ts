export const STATUSES = ["prototype", "study", "native", "sketch"] as const;

export type ExperimentStatus = (typeof STATUSES)[number];

export type ExperimentLink = {
  label: string;
  href: string;
};

export type Experiment = {
  slug: string;
  title: string;
  summary: string;
  status: ExperimentStatus;
  year: string;
  tags: string[];
  stack: string[];
  links: ExperimentLink[];
  featured: boolean;
  body: string;
};

export const STATUS_LABEL: Record<ExperimentStatus, string> = {
  prototype: "Prototype",
  study: "Study",
  native: "Native",
  sketch: "Sketch",
};
