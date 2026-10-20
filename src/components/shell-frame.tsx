"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { site } from "@/lib/site";
import styles from "@/app/lab.module.css";

const github = "https://github.com/YogeshBhusara/lab";
const motionMs = 520;
const ease = unitEase(0.22, 1, 0.36, 1);

type Rect = { left: number; top: number; width: number; height: number };

type CardOrigin = Rect & { slug: string; src: string };

type ClosingShot = {
  slug: string;
  src: string;
  noteRect: Rect;
  clone: HTMLElement;
};

function unitEase(x1: number, y1: number, x2: number, y2: number) {
  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i += 1) {
      const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
      const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
      if (Math.abs(x - t) < 1e-4) break;
      u = Math.min(1, Math.max(0, u - (x - t) / (dx || 1)));
    }
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function experimentSlug(pathname: string) {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const prefix = "/experiments/";
  return path.startsWith(prefix) ? path.slice(prefix.length) : "";
}

function measure(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

export function ShellFrame({ count, children }: { count: number; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const open = pathname.startsWith("/experiments/");
  const slugRef = useRef("");
  const originRef = useRef<CardOrigin | null>(null);
  const closingRef = useRef<ClosingShot | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  if (open) slugRef.current = experimentSlug(pathname);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      snapshotClose();
      router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, router]);

  function snapshotClose() {
    const note = stageRef.current?.querySelector<HTMLElement>("[data-note]");
    const slug = slugRef.current;
    if (!note || !slug) return;
    const saved = originRef.current?.slug === slug ? originRef.current : null;
    closingRef.current = {
      slug,
      src: saved?.src ?? "",
      noteRect: measure(note),
      clone: note.cloneNode(true) as HTMLElement,
    };
  }

  function rememberCard(event: React.MouseEvent) {
    const link = (event.target as Element | null)?.closest("a");
    if (!(link instanceof HTMLAnchorElement)) return;
    const slug = experimentSlug(link.pathname);
    if (slug) {
      const image = link.querySelector("img");
      originRef.current = {
        slug,
        src: image instanceof HTMLImageElement ? image.src : "",
        ...measure(link),
      };
      return;
    }
    if (link.pathname === "/" && open) snapshotClose();
  }

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      closingRef.current = null;
      return;
    }

    const slug = experimentSlug(pathname);
    const opening = open && originRef.current?.slug === slug ? originRef.current : null;
    const shot = !open ? closingRef.current : null;
    if (!opening && !shot) return;
    if (shot) closingRef.current = null;

    const note = opening ? stage.querySelector<HTMLElement>("[data-note]") : null;
    if (opening && !note) return;

    const portal = document.createElement("div");
    portal.className = styles.portal;
    portal.inert = true;
    const src = opening?.src || shot?.src || "";
    if (src) portal.style.backgroundImage = `url(${JSON.stringify(src)})`;
    const clone = (opening ? note!.cloneNode(true) : shot!.clone) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    portal.appendChild(clone);
    document.body.appendChild(portal);
    if (note) note.style.visibility = "hidden";

    const frozenCard = opening ?? originRef.current;
    const frozenNote = shot?.noteRect ?? null;
    const started = performance.now();
    let frame = 0;
    let stopped = false;
    let finished = false;

    const place = (now: number) => {
      if (stopped || finished) return;
      const raw = Math.min(1, (now - started) / motionMs);
      const towardNote = ease(open ? raw : 1 - raw);
      const live = open
        ? null
        : stage.querySelector<HTMLElement>(`a[href="/experiments/${shot?.slug ?? slug}"]`);
      const card = live ? measure(live) : frozenCard;
      const page = note ? measure(note) : frozenNote;
      if (!card || !page) {
        if (raw < 1) frame = requestAnimationFrame(place);
        return;
      }
      const visual: Rect = {
        left: mix(card.left, page.left, towardNote),
        top: mix(card.top, page.top, towardNote),
        width: mix(card.width, page.width, towardNote),
        height: mix(card.height, page.height, towardNote),
      };
      portal.style.left = `${visual.left}px`;
      portal.style.top = `${visual.top}px`;
      portal.style.width = `${visual.width}px`;
      portal.style.height = `${visual.height}px`;
      portal.style.backgroundSize = `${card.width}px ${card.height}px`;
      portal.style.backgroundPosition = `${card.left - visual.left}px ${card.top - visual.top}px`;
      clone.style.boxSizing = "border-box";
      clone.style.width = `${visual.width}px`;
      clone.style.height = `${visual.height}px`;
      clone.style.transform = "none";
      clone.style.opacity = String(towardNote);
      if (raw < 1) {
        frame = requestAnimationFrame(place);
        return;
      }
      finished = true;
      portal.remove();
      if (note) note.style.visibility = "";
    };

    place(started);
    const backup = window.setTimeout(() => {
      if (!finished) place(started + motionMs);
    }, motionMs);

    return () => {
      stopped = true;
      window.clearTimeout(backup);
      cancelAnimationFrame(frame);
      portal.remove();
      if (note) note.style.visibility = "";
      if (shot && !finished) closingRef.current = shot;
    };
  }, [open, pathname]);

  return (
    <div className={styles.shell} data-open={open ? "" : undefined} onClickCapture={rememberCard}>
      <aside className={styles.panel} inert={open ? true : undefined}>
        <div className={styles.board}>
          <Link className={styles.mark} href="/">
            Lab
          </Link>
          <p className={styles.byline}>
            <span className={styles.star} aria-hidden="true">
              *
            </span>
            {site.author}
          </p>
          <p className={styles.intro}>
            Prototypes, studies, and native apps. Each page has the note, the stack, and a link you can send.
          </p>
          <a className={styles.call} href={github} target="_blank" rel="noreferrer">
            GitHub
            <Arrow />
          </a>
          <div className={styles.sheet}>
            <p className={styles.label}>Experiments</p>
            <p className={styles.value}>{count}</p>
            <p className={styles.label}>GitHub</p>
            <a className={styles.value} href={github} target="_blank" rel="noreferrer">
              YogeshBhusara/lab
            </a>
          </div>
        </div>
      </aside>
      <div ref={stageRef} className={styles.stage}>
        {children}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
