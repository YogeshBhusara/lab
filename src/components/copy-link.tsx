"use client";

import { useEffect, useState } from "react";

export function CopyLink({ path }: { path: string }) {
  const [label, setLabel] = useState("Copy share link");
  const [url, setUrl] = useState(path);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setLabel("Link copied");
    } catch {
      setLabel("Select the link below");
    }
    window.setTimeout(() => setLabel("Copy share link"), 1800);
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-10 items-center border border-[#1a1714] bg-[#1a1714] px-4 text-sm text-[#f6f1e7] transition hover:bg-[#e7ff6a] hover:text-[#1a1714]"
      >
        {label}
      </button>
      <p className="basis-full font-mono text-xs break-all text-[#1a1714]/55">{url}</p>
    </>
  );
}
