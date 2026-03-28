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
  serverExternalPackages: ['mammoth', 'pdf-parse', 'html-to-docx'],
  async redirects() {
    return [
      { source: '/disability', destination: '/disability-welfare', permanent: true },
      { source: '/downloads/disability.xlsx', destination: '/downloads/disability-welfare.xlsx', permanent: true },
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
        ],
      },
    ];
  },
};

export default nextConfig;
