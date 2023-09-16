/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "img.clerk.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
