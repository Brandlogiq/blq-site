import type { NextConfig } from "next";

const repoName = (process.env.NEXT_PUBLIC_BASE_PATH || "blq-site").replace(
  /^\//,
  ""
);
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
