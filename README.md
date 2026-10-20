# Lab

A public index of Yogesh Bhusara’s experiments. Each note has its own page, so a link like `/experiments/shai` is enough to share one of them.

The apps themselves stay in their own folders and repositories. This site is the shelf.

## Add an experiment

1. Copy `content/experiments/_template.md` to a new file, for example `content/experiments/my-thing.md`.
2. The file name is the URL. `my-thing.md` is published at `/experiments/my-thing`.
3. Fill in the title, a one-sentence summary, and a status: `prototype`, `study`, `native`, or `sketch`.
4. Set `visual: true` when the experiment should appear on the shelf. Anything else stays in the folder and is not published.
5. Put a screenshot at `public/experiments/my-thing.jpg` and set `image` to that path. The shelf shows the picture full-bleed, and the name appears on hover.
6. Add a `link:` line only when a GitHub or live URL exists.
7. Commit and push. Vercel publishes the page.

Files whose names start with `_` are templates and are not published.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000.
