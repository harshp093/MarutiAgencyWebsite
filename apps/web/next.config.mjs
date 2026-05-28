/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@maaruti/ui"],

  // Skip type/lint checks on Vercel build
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // ── Performance ────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // Experimental optimisations
  experimental: {
    // Optimize package imports to reduce JS bundle size
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // ── Image optimisation ─────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400 * 30, // 30 days
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Limit concurrent image optimizations (Vercel free tier)
    dangerouslyAllowSVG: false,
  },

  // ── Aggressive caching headers ──────────────────────────────
  async headers() {
    return [
      {
        // Static hero assets — immutable cache 1 year
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Optimized images served by Next.js
        source: "/_next/image/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;

