import { Catalog } from "@/components/catalog";
import { getExperiments } from "@/lib/experiments";
import styles from "./lab.module.css";

export default function HomePage() {
  const experiments = getExperiments();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Experiments</h1>
        <p className={styles.lede}>
          Prototypes, studies, and native apps. Open any one for the note, the stack, and a link you can send.
        </p>
      </section>

      <Catalog experiments={experiments} />
    </div>
  );
}
