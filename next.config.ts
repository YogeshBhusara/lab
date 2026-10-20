import type { NextConfig } from "next";

// A lockfile in the parent folder makes Turbopack pick the wrong root.
const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
