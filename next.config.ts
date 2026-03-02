import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ['mammoth', 'pdf-parse', 'html-to-docx'],
};

export default nextConfig;
