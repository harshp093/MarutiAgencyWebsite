/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@maaruti/ui"],
  // Skip type checking and linting on build for faster Vercel deploys
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
