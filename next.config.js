/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['page.tsx', 'api.ts'],
};

module.exports = nextConfig;
