import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Add an experiment",
  description: "How to publish a new experiment on Lab and get a shareable link.",
};

const template = `---
title: "Name of the experiment"
summary: "One sentence a visitor can understand."
status: prototype
year: "2026"
tags: interface, web
stack: Next.js, TypeScript
link: GitHub | https://github.com/YogeshBhusara/your-repo
link: Live | https://your-demo.vercel.app
featured: false
---

What you tried, what it does, and what is still unfinished.

- A concrete detail
- Another concrete detail`;

export default function AddPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-[11px] tracking-[0.18em] text-[#e7ff6a] uppercase">
        For {site.author}
      </p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight italic">Add an experiment</h1>
      <div className="mt-6 space-y-4 text-lg leading-8 text-[#f4efe4]/75">
        <p>
          Drop a Markdown file into <code className="text-[#e7ff6a]">content/experiments</code>.
          The file name becomes the share link. <code className="text-[#e7ff6a]">shai.md</code>{" "}
          is published at <code className="text-[#e7ff6a]">/experiments/shai</code>.
        </p>
        <p>
          Commit the file and push to GitHub. Vercel builds the site and the new page is public.
          Anyone with the link can read the note. They cannot edit the index.
        </p>
      </div>

      <ol className="mt-8 space-y-3 text-[#f4efe4]/85">
        <li>1. Copy the template below into a new `.md` file. Skip names that start with `_`.</li>
        <li>2. Set status to `prototype`, `study`, `native`, or `sketch`.</li>
        <li>3. Add a GitHub or live URL only when one exists.</li>
        <li>4. Push. Open the new page and use Copy share link.</li>
      </ol>

      <pre className="mt-8 overflow-x-auto border border-white/10 bg-black/30 p-5 font-mono text-sm leading-6 text-[#f4efe4]/90">
        {template}
      </pre>
    </div>
  );
}
