export const site = {
  name: "Lab",
  author: "Yogesh Bhusara",
  description:
    "A public index of Yogesh Bhusara’s experiments, prototypes, and studies. Every entry has a page you can share.",
};

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function experimentPath(slug: string) {
  return `/experiments/${slug}`;
}
