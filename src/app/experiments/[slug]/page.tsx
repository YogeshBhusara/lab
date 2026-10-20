import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/copy-link";
import { Prose } from "@/components/prose";
import { getExperiment, getExperiments } from "@/lib/experiments";
import { experimentPath } from "@/lib/site";
import { STATUS_LABEL } from "@/lib/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getExperiments().map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return { title: "Missing experiment" };
  return {
    title: experiment.title,
    description: experiment.summary,
    openGraph: {
      title: experiment.title,
      description: experiment.summary,
      url: experimentPath(experiment.slug),
    },
  };
}

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <Link
        href="/#index"
        className="font-mono text-[11px] tracking-[0.18em] text-[#f4efe4]/55 uppercase hover:text-[#e7ff6a]"
      >
        Back to the index
      </Link>

      <div className="mt-8 bg-[#f6f1e7] px-6 py-8 text-[#1a1714] sm:px-10 sm:py-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase">
          <span className="bg-[#1a1714] px-2 py-1 text-[#e7ff6a]">
            {STATUS_LABEL[experiment.status]}
          </span>
          {experiment.year ? <span className="text-[#1a1714]/55">{experiment.year}</span> : null}
          {experiment.tags.map((tag) => (
            <span key={tag} className="text-[#1a1714]/55">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight italic sm:text-6xl">
          {experiment.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#3c3832]">{experiment.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CopyLink path={experimentPath(experiment.slug)} />
          {experiment.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center border border-[#1a1714]/20 px-4 text-sm hover:border-[#1a1714]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 border-t border-[#1a1714]/10 pt-8">
          <Prose body={experiment.body} />
        </div>

        {experiment.stack.length > 0 ? (
          <div className="mt-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#1a1714]/45 uppercase">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {experiment.stack.map((item) => (
                <li key={item} className="border border-[#1a1714]/15 px-2 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
