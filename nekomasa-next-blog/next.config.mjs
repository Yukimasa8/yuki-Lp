/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  basePath: '/yuki-Lp',
  assetPrefix: '/yuki-Lp/',
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io'],
  },
  
  /* config options here */
};

export default nextConfig;
