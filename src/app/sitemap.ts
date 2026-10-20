import type { MetadataRoute } from "next";
import { getExperiments } from "@/lib/experiments";
import { experimentPath, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const experiments = getExperiments().map((experiment) => ({
    url: `${base}${experimentPath(experiment.slug)}`,
    changeFrequency: "monthly" as const,
    priority: experiment.featured ? 0.8 : 0.6,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...experiments,
  ];
}
