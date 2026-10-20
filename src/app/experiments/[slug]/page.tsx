import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/arc/badge/badge";
import { Prose } from "@/components/prose";
import { ShareLink } from "@/components/share-link";
import { getExperiment, getExperiments } from "@/lib/experiments";
import { experimentPath } from "@/lib/site";
import { STATUS_LABEL } from "@/lib/types";
import styles from "../../lab.module.css";

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
    <article className={styles.notePage}>
      <div className={styles.note}>
        <Link className={styles.close} href="/">
          Close
        </Link>
        <div className={styles.kicker}>
          <Badge size="sm">{STATUS_LABEL[experiment.status]}</Badge>
          {experiment.year ? <span>{experiment.year}</span> : null}
          {experiment.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h1 className={styles.heading}>
          {experiment.title}
        </h1>
        <p className={styles.summary}>{experiment.summary}</p>
        <ShareLink path={experimentPath(experiment.slug)} />
        {experiment.links.length > 0 ? (
          <div className={styles.row}>
            {experiment.links.map((link) => (
              <a key={link.href} className={styles.external} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        <Prose body={experiment.body} />
        {experiment.stack.length > 0 ? (
          <ul className={styles.stack}>
            {experiment.stack.map((item) => (
              <li key={item}>
                <Badge tone="neutral" size="sm">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
