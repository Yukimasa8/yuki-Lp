/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    domains: ['cdn.sanity.io'],
  },
  
  /* config options here */
};

export default nextConfig;
