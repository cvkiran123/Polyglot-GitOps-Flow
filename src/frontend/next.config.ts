import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', 
  // Optional: If you want to ensure images don't break during static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;