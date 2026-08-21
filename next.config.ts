import type { NextConfig } from "next";

// GitHub Pages project 页的 basePath（本地开发为空，CI 部署时通过环境变量注入）
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // 静态导出，适配 GitHub Pages
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;