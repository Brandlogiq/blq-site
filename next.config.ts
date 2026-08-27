import type { NextConfig } from "next";

const repoName = "blq-site";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Project Pages live at /blq-site; skip the prefix in local `next dev`.
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : "",
};

export default nextConfig;
