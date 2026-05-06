import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  reactStrictMode: false,
  cacheComponents: true,
  serverExternalPackages: ['mammoth', 'pdf-parse', 'html-to-docx', '@resvg/resvg-js'],
  // 確保字型檔案與知識庫包含在 Vercel 部署 bundle 中（readFileSync 路徑無法被靜態追蹤）
  outputFileTracingIncludes: {
    '/blog/[slug]/opengraph-image': ['./fonts/**'],
    '/api/reports/evaluation': ['./knowledge/wiki/**'],
    '/api/downloads/[file]': ['./private/downloads/**/*'],
  },
  async redirects() {
    return [
      { source: '/disability', destination: '/disability-welfare', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
