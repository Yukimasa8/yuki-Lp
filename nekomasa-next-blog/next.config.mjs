/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io'],
  },
  
  /* config options here */
};

export default nextConfig;
