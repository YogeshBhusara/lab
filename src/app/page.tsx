import { Catalog } from "@/components/catalog";
import { getExperiments } from "@/lib/experiments";
import styles from "./lab.module.css";

export default function HomePage() {
  return (
    <>
      <h1 className={styles.srOnly}>Experiments</h1>
      <Catalog experiments={getExperiments()} />
    </>
  );
}
