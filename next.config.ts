import type { NextConfig } from "next";

const repoName = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/^\//, "");
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
