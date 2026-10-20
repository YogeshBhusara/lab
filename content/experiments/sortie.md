---
title: "Sortie"
summary: "Paste an unstructured list and get labelled groups from meaning, without deciding the categories first."
status: prototype
year: "2026"
tags: ai, data, web
stack: Next.js, TypeScript, embeddings
featured: false
---

Sortie takes text, CSV, or loose notes, embeds the items, and clusters them into a labelled taxonomy. You pick a sorting lens. You do not invent the buckets up front.

Clustering is a small k-means over embeddings, kept inside the app rather than handed to a separate ML service.
