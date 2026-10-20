import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Shell } from "@/components/shell";
import { getSiteUrl, site } from "@/lib/site";
import "@/components/arc/foundation.css";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} · ${site.author}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.author}`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={grotesk.variable}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
