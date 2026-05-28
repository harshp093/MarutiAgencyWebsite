/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@maaruti/ui"],

  // Skip type/lint checks on Vercel build
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // ── Performance ────────────────────────────────────────────
  compress: true,

  // Experimental optimisations
  experimental: {
    // Optimize package imports to reduce JS bundle size
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // ── Image optimisation ─────────────────────────────────────
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── Aggressive caching headers ──────────────────────────────
  async headers() {
    return [
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
