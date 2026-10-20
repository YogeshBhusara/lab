# Lab

A public index of Yogesh Bhusara’s experiments. Each note has its own page, so a link like `/experiments/shai` is enough to share one of them.

The apps themselves stay in their own folders and repositories. This site is the shelf.

## Add an experiment

1. Copy `content/experiments/_template.md` to a new file, for example `content/experiments/my-thing.md`.
2. The file name is the URL. `my-thing.md` is published at `/experiments/my-thing`.
3. Fill in the title, a one-sentence summary, and a status: `prototype`, `study`, `native`, or `sketch`.
4. Add a `link:` line only when a GitHub or live URL exists.
5. Commit and push. Vercel publishes the page.

Files whose names start with `_` are templates and are not published.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000.
