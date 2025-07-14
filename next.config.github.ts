import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/payroll' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/payroll' : '',
  
  // Disable API routes for static export
  async rewrites() {
    return [];
  },
  
  // Skip API routes during build
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
};

export default nextConfig; 