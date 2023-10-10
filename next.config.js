/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "img.clerk.com"],
  },
  experimental: {
    serverActions: true,
  },
  //  target: "serverless",
    future: { webpack5: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    }
};

module.exports = nextConfig;
