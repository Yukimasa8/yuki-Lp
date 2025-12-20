/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Keep this if you use optimized images, but 'unoptimized: true' is often needed if not using Vercel Image Optimization quota
  },

  /* config options here */
};

export default nextConfig;
