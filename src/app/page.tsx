import Link from "next/link";
import { Catalog } from "@/components/catalog";
import { StatsBand } from "@/components/arc/blocks/stats-band/stats-band";
import { getExperiments } from "@/lib/experiments";
import styles from "./lab.module.css";

export default function HomePage() {
  const experiments = getExperiments();
  const withRepo = experiments.filter((experiment) => experiment.links.length > 0).length;
  const prototypes = experiments.filter((experiment) => experiment.status === "prototype").length;
  const nativeApps = experiments.filter((experiment) => experiment.status === "native").length;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>A shelf for experiments that used to live in folders</h1>
        <p className={styles.lede}>
          Prototypes, studies, and native apps. Open any one for the note, the stack, and a link you can send.
        </p>
        <div className={styles.actions}>
          <Link className={`${styles.action} ${styles.primary}`} href="#index">
            Browse the index
          </Link>
          <Link className={`${styles.action} ${styles.secondary}`} href="/add">
            Add an experiment
          </Link>
        </div>
      </section>

      <StatsBand
        layout="divided"
        stats={[
          { value: experiments.length, label: "Experiments", detail: "On this shelf" },
          { value: withRepo, label: "With a repository", detail: "Linked from the note" },
          { value: prototypes, label: "Prototypes", detail: "Still being shaped" },
          { value: nativeApps, label: "Native apps", detail: "iPhone and Apple Watch" },
        ]}
      />

      <Catalog experiments={experiments} />
    </div>
  );
}
