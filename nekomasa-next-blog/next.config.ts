import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    domains: ['cdn.sanity.io'],
  },
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
