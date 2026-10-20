import type { Metadata } from "next";
import { CodeBlock } from "@/components/arc/code-block/code-block";
import styles from "../lab.module.css";

export const metadata: Metadata = {
  title: "Add an experiment",
  description: "Publish a new experiment on Lab and get a page you can share.",
};

const template = `---
title: "Name of the experiment"
summary: "One sentence a visitor can understand."
status: prototype
year: "2026"
tags: interface, web
stack: Next.js, TypeScript
link: GitHub | https://github.com/YogeshBhusara/your-repo
featured: false
---

What you tried, what it does, and what is still unfinished.`;

export default function AddPage() {
  return (
    <div className={`${styles.page} ${styles.reading}`}>
      <div className={styles.note}>
        <h1 className={styles.heading}>
          Add an experiment
        </h1>
        <p className={styles.summary}>
          A markdown file in the repository becomes a public page. The file name is the link.
        </p>
        <ol className={styles.steps}>
          <li>
            Copy the template into <strong>content/experiments/my-thing.md</strong>. Names that start with an underscore stay unpublished.
          </li>
          <li>
            Set status to <strong>prototype</strong>, <strong>study</strong>, <strong>native</strong>, or <strong>sketch</strong>.
          </li>
          <li>Add a link only when a repository or a live demo exists.</li>
          <li>
            Push to GitHub. The page is published at <strong>/experiments/my-thing</strong>.
          </li>
        </ol>
        <CodeBlock code={template} filename="content/experiments/my-thing.md" language="md" />
      </div>
    </div>
  );
}
