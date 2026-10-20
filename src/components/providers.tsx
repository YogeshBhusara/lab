"use client";

import Link from "next/link";
import { ArcProvider } from "@/components/arc/lib/arc-provider";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import { SiteHeader } from "@/components/arc/blocks/site-header/site-header";
import { ThemeSwitch } from "@/components/arc/theme-switch/theme-switch";
import { useLabTheme } from "@/components/theme";
import styles from "@/app/lab.module.css";

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M6 16.5V10.2C6 7.3 8.2 5.2 11 5.2s5 2.1 5 5v6.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M11 12.2v4.3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function Chrome({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useLabTheme();

  return (
    <>
      <div className={styles.chrome}>
        <SiteHeader
          variant="simple"
          brand={{ name: "Lab", href: "/", mark: <Mark /> }}
          items={[]}
          secondaryAction={null}
          primaryAction={null}
          label="Lab"
        />
        <div className={styles.theme}>
          <ThemeSwitch
            theme={theme}
            iconOnly
            onThemeChange={(next) => {
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (reduced || typeof document.startViewTransition !== "function") {
                setTheme(next);
                return;
              }
              document.startViewTransition(() => setTheme(next));
            }}
          />
        </div>
      </div>
      <main>{children}</main>
      <SiteFooter
        variant="minimal"
        brand={{ name: "Lab", href: "/", mark: <Mark /> }}
        tagline="A public index of experiments."
        links={[
          { label: "GitHub", href: "https://github.com/YogeshBhusara/lab", external: true },
        ]}
        columns={[]}
        legal={[]}
        socials={[]}
        newsletter={null}
        status={null}
        year={2026}
      />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ArcProvider link={Link}>
      <Chrome>{children}</Chrome>
    </ArcProvider>
  );
}
